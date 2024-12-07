import { expect } from "chai";
import { ethers } from "hardhat";

describe("HeroicDonationPay and CrowdFund", function () {
  let owner: any, otherAccount: any;
  let heroicDonationPay: any;
  let crowdFund: any;

  before(async function () {
    // Obtener cuentas de prueba
    [owner, otherAccount] = await ethers.getSigners();
  });

  beforeEach(async function () {
    // Desplegar HeroicDonationPay
    const HeroicDonationPay = await ethers.getContractFactory("HeroicDonationPay");
    heroicDonationPay = await HeroicDonationPay.deploy(owner.address, 1000000);

    // Desplegar CrowdFund
    const CrowdFund = await ethers.getContractFactory("CrowdFund");
    crowdFund = await CrowdFund.deploy(heroicDonationPay.address);
  });

  it("Debería desplegar HeroicDonationPay con el propietario correcto", async function () {
    expect(await heroicDonationPay.owner()).to.equal(owner.address);
  });

  it("Debería desplegar HeroicDonationPay con el suministro inicial correcto", async function () {
    const decimals = await heroicDonationPay.decimals();
    const totalSupply = await heroicDonationPay.totalSupply();
    expect(totalSupply).to.equal(ethers.parseUnits("1000000", decimals));
  });
  
  it("Debería desplegar CrowdFund con la dirección del token correcta", async function () {
    expect(await crowdFund.token()).to.equal(heroicDonationPay.address);
  });
});