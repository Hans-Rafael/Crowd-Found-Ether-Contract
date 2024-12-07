//*** Con hardhat-ignition npm install @nomicfoundation/hardhat-ignition*****/
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Construimos el módulo de despliegue
const DeployModule = buildModule("DeployModule", (m) => {
  // Dirección del propietario inicial del token
  const tokenOwnerAddress = m.getParameter(
    "tokenOwner",
    "0xYourTokenOwnerAddressHere"
  );

  // Desplegar el contrato MyToken con la dirección del propietario
  const token = m.contract("MyToken", [tokenOwnerAddress]);

  // Desplegar el contrato CrowdFund pasando la dirección del contrato token recién desplegado
  const crowdFund = m.contract("CrowdFund", [token.address]);

  return { token, crowdFund };
});

export default DeployModule;

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
