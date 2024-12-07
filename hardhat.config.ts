import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// Variables de configuración ( npx hardhat vars set <variable>  )
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY") || ""; // API Key de Alchemy
const PRIVATE_KEY = vars.get("PRIVATE_KEY") || ""; // Clave privada de tu cuenta MetaMask (Sepolia)
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY") || ""; // API Key de Etherscan

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26", // Especifica la versión de Solidity
    settings: {
      optimizer: {
        enabled: true, // Habilita el optimizador
        runs: 200, // Número de iteraciones de optimización
      },
    },
  },
  paths: {
    sources: "./contracts", // Ruta al directorio de contratos
    artifacts: "./artifacts", // Ruta al directorio de artefactos
    tests: "./test", // Ruta al directorio de pruebas
    cache: "./cache", // Ruta al directorio de caché
  },
  networks: {
    Sepolia: {
      url: `https://eth-sepolia.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // Clave privada para la cuenta MetaMask
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY, // API Key de Etherscan para Validaciones
  },
  mocha: {
    timeout: 40000, // Tiempo de espera para las pruebas
  },
};

export default config;
