import { expect } from "chai";
import { ethers, network } from "hardhat";

describe("HeroicDonationPay and CrowdFund", function () {
  let owner: any, otherAccount: any;
  let heroicDonationPay: any;
  let crowdFund: any;

  before(async function () {
    // Obtener cuentas de prueba
    [owner, otherAccount] = await ethers.getSigners();
    console.log("Owner address:", owner.address);
    console.log("Other account address:", otherAccount.address);
  });

  beforeEach(async function () {
    // Desplegar HeroicDonationPay
    const HeroicDonationPay = await ethers.getContractFactory(
      "HeroicDonationPay"
    );
    heroicDonationPay = await HeroicDonationPay.deploy(owner.address, 1000000);
    await heroicDonationPay.waitForDeployment();
    console.log("HeroicDonationPay address:", heroicDonationPay.target);

    // Desplegar CrowdFund
    const CrowdFund = await ethers.getContractFactory("CrowdFund");
    crowdFund = await CrowdFund.deploy(heroicDonationPay.target);
    await crowdFund.waitForDeployment();
    console.log("CrowdFund address:", crowdFund.target);
  });
  describe("HeroicDonationPay tests", function () {
    it('Debería desplegar HeroicDonationPay "HDB" con el propietario correcto', async function () {
      expect(await heroicDonationPay.owner()).to.equal(owner.address);
    });

    it("Debería desplegar HeroicDonationPay (HDP) con el suministro inicial correcto", async function () {
      const decimals = await heroicDonationPay.decimals();
      const totalSupply = await heroicDonationPay.totalSupply();
      console.log("Total Supply:", totalSupply.toString());
      expect(totalSupply).to.equal(ethers.parseUnits("1000000", decimals));
    });
    it("Debería permitir al propietario mintear nuevos tokens", async function () {
      const mintAmount = ethers.parseUnits("1000", 18);
      await heroicDonationPay
        .connect(owner)
        .mint(otherAccount.address, mintAmount);

      const balance = await heroicDonationPay.balanceOf(otherAccount.address);
      expect(balance).to.equal(mintAmount);

      const totalSupply = await heroicDonationPay.totalSupply();
      const initialSupply = ethers.parseUnits("1000000", 18);

      const expectedTotalSupply = initialSupply + BigInt(mintAmount); // Usando BigInt para la suma
      expect(totalSupply).to.equal(expectedTotalSupply);
    });
  });
  describe("CrowdFund tests", function () {
    it("Debería desplegar CrowdFund con la dirección del token correcta", async function () {
      expect(await crowdFund.token()).to.equal(heroicDonationPay.target);
    });
    it("Debería crear una campaña correctamente", async function () {
      const goal = ethers.parseUnits("500", 18);// 500 tokens
      console.log("Goal:", goal);
      const startAt = Math.floor(Date.now() / 1000) + 120; // empieza en 2 minutos
      console.log("StartAt:", startAt);
      const endAt = startAt + 60 * 60 * 24; // dura 1 día
      console.log("EndAt:", endAt);

      // Aquí aseguramos que el owner sea el creador
      await crowdFund.connect(owner).launch(goal, startAt, endAt);
      console.log("Campaign created by XXXXX:", owner.address);

      const campaign = await crowdFund.campaigns(1);
      console.log("CampaignID:", campaign);
      expect(campaign.creator).to.equal(owner.address);
      expect(campaign.goal).to.equal(goal);
      expect(campaign.startAt).to.equal(startAt);
      expect(campaign.endAt).to.equal(endAt);
      expect(campaign.pledged).to.equal(0);
      expect(campaign.claimed).to.equal(false);
    });

    it("Debería permitir promesas a una campaña", async function () {
      const goal = ethers.parseUnits("500", 18);
      const startAt = Math.floor(Date.now() / 1000) + 120; // empieza en 2 minutos
      const endAt = startAt + 60 * 60 * 24; // dura 1 día

      // Aquí aseguramos que el owner sea el creador
      await crowdFund.connect(owner).launch(goal, startAt, endAt);
      // Transferir tokens a otherAccount para que pueda hacer una promesa
      const pledgeAmount = ethers.parseUnits("500", 18); // 500 tokens
      await heroicDonationPay
        .connect(owner)
        .transfer(otherAccount.address, pledgeAmount);
      // Avanzar el tiempo para que la campaña haya comenzado
      await network.provider.send("evm_increaseTime", [120]);
      await network.provider.send("evm_mine");

      // Aquí aseguramos que otherAccount sea el prometedor
      await heroicDonationPay
        .connect(otherAccount)
        .approve(crowdFund.target, pledgeAmount);
      await crowdFund.connect(otherAccount).pledge(1, pledgeAmount);

      const campaign = await crowdFund.campaigns(1);
      expect(campaign.pledged).to.equal(pledgeAmount);

      const pledged = await crowdFund.pledgedAmount(1, otherAccount.address);
      expect(pledged).to.equal(pledgeAmount);
    });
    it("Debería fallar al intentar prometer más tokens de los que se poseen", async function () {
      const goal = ethers.parseUnits("500", 18);
      const startAt = Math.floor(Date.now() / 1000) + 180; // empieza en 3 minutos para mayor seguridad
      const endAt = startAt + (60 * 60 * 24); // dura 1 día
    
      await crowdFund.connect(owner).launch(goal, startAt, endAt);
    
      // Transferir tokens a otherAccount (menos de la cantidad que se intentará prometer)
      const lessPledgeAmount = ethers.parseUnits("50", 18);// otherAccount recibe 50 tokens
      const pledgeAmount = ethers.parseUnits("100", 18); //otherAccount intenta prometer 100 tokens
      await heroicDonationPay.connect(owner).transfer(otherAccount.address, lessPledgeAmount);
    
      // Avanzar el tiempo para que la campaña haya comenzado
      await network.provider.send("evm_increaseTime", [180]); // avanzar en 3 minutos
      await network.provider.send("evm_mine");
    
      await heroicDonationPay.connect(otherAccount).approve(crowdFund.target, pledgeAmount);
    
      // Intentar prometer más tokens de los que se poseen debería fallar
      await expect(
        crowdFund.connect(otherAccount).pledge(1, pledgeAmount) // Intentar prometer 100 tokens a la campañaid 1
      ).to.be.reverted;
    });       
  });
});
