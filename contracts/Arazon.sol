// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Arazon {

    string public name ;
    address public owner;

    constructor() {
        name = "Arazon";
        
        owner = msg.sender;
    }

}


