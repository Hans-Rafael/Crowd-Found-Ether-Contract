// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
// Compatible with OpenZeppelin Contracts ^5.0.0
//@Author: Hans Garcia.

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract HeroicDonationPay is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner, uint256 initialSupply)
        ERC20("Heroic Donation Pay", "HDP")
        Ownable(initialOwner)
        ERC20Permit("Heroic Donation Pay")
    {
        _mint(msg.sender, initialSupply * 10**decimals());
    }

    //in case is need more token for the auction!
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}