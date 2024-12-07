//*** Con hardhat-ignition npm install @nomicfoundation/hardhat-ignition*****/
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";//remember import in hardhat.config 
import { vars } from "hardhat/config";

// Definir parámetros
// Variables de configuración ( npx hardhat vars set <variable>  )
const INITIAL_OWNER = vars.get("INITIAL_OWNER") || "0xYourWalletAddressHere"; // Dirección del propietario inicial
const INITIAL_SUPPLY = 1000000; // Suministro inicial de tokens (por ejemplo, 1,000,000 tokens)

const LockModule = buildModule("TokenCrowdFundModule", (m) => {
  // Desplegar el contrato del token
  const token = m.contract("HeroicDonationPay", [INITIAL_OWNER, INITIAL_SUPPLY]);

  // Desplegar el contrato de CrowdFund, pasando la dirección del token
  const crowdFund = m.contract("CrowdFund", [token]);

  return { token, crowdFund };
});

export default LockModule;
//deploy: npx hardhat ignition deploy ./ignition/modules/deploy.ts --network sepolia



//********Basic style**********/
/* import { ethers } from "hardhat";

async function main() {
    // Desplegar el token
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy("0xYourInitialOwnerAddress"); // Dirección del propietario inicial
    await token.deployed();
    console.log("Token deployed to:", token.address);

    // Desplegar el contrato CrowdFund
    const CrowdFund = await ethers.getContractFactory("CrowdFund");
    const crowdFund = await CrowdFund.deploy(token.address); // Usar la dirección del token desplegado
    await crowdFund.deployed();
    console.log("CrowdFund deployed to:", crowdFund.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); */
