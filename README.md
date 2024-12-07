# Crowd-Found-Ether-Contract
# Proyecto de Crowdfunding ERC20

Este proyecto permite a los usuarios crear y participar en campañas de crowdfunding utilizando tokens ERC20.

## Descripción

- **Crear Campaña:** Los usuarios pueden crear una campaña de crowdfunding especificando un objetivo de financiación.
- **Realizar Pledge:** Otros usuarios pueden apoyar la campaña transfiriendo sus tokens ERC20 a la campaña.
- **Reclamar Fondos:** Si la campaña alcanza su objetivo de financiación al final del período de la campaña, el creador de la campaña puede reclamar los fondos.
- **Retirar Pledge:** Si la campaña no alcanza su objetivo, los usuarios pueden retirar sus pledges.

## Funcionalidades

1. **Crear Campaña**
   - El usuario especifica un objetivo de financiación y una fecha límite.
   - Se genera una nueva campaña con un identificador único.

2. **Realizar Pledge**
   - Los usuarios pueden transferir tokens a la campaña.
   - El contrato almacena el monto de cada pledge.

3. **Reclamar Fondos**
   - Después de que la campaña finaliza, si se ha alcanzado el objetivo de financiación, el creador de la campaña puede retirar los fondos.

4. **Retirar Pledge**
   - Si la campaña no alcanza el objetivo de financiación, los usuarios pueden retirar sus tokens.

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
2. Instalar las dependencias:
   ```bash
   npm install
## Uso 

1. Desplegar el contrato:
   - npx hardhat run scripts/deploy.js --network <tu-red>
2. Interactuar con el contrato:
   - Crear una campaña, realizar un pledge, reclamar fondos y retirar pledge mediante las funciones disponibles en el contrato.
## Licencia
Este proyecto está licenciado bajo la [MIT License](https://opensource.org/licenses/MIT).
