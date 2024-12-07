import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition"; // Necesario para Hardhat Ignition

// Variables de configuración ( npx hardhat vars set <variable>  )
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY") || ""; // API Key de Alchemy
const PRIVATE_KEY = vars.get("PRIVATE_KEY") || ""; // Clave privada de tu cuenta MetaMask (Sepolia)
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY") || ""; // API Key de Etherscan

const config: HardhatUserConfig = {
  //solidity: "0.8.26",
  solidity: {
    version: "0.8.26", // Especifica la versión de Solidity
    settings: {
      optimizer: {
        enabled: true, // Habilita el optimizador
        runs: 200, // Número de iteraciones de optimización
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`], // Clave privada para la cuenta MetaMask
    },
  },
  paths: {
    sources: "./contracts", // Ruta al directorio de contratos
    artifacts: "./artifacts", // Ruta al directorio de artefactos
    tests: "./test", // Ruta al directorio de pruebas
    cache: "./cache", // Ruta al directorio de caché
  },
  
  etherscan: {
    apiKey: ETHERSCAN_API_KEY, // API Key de Etherscan para Validaciones npm install --save-dev @nomiclabs/hardhat-etherscan

  },
  mocha: {
    timeout: 40000, // Tiempo de espera para las pruebas
  },
};

export default config;
