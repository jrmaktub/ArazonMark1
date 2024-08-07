// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Arazon {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    //information included in the vennt
    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost, uint256 quantity);

    // modifier onlyUser() {
    //     //require is verified User
    //     // require(msg.sender == owner);
    // }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //List products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public {
        //create Item struct
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        //save Item struct to blockchain
        items[_id] = item;

        //emit event
        emit List(_name, _cost, _stock);
    }

    //Buy products
    function buy(uint256 _id) public payable {
        //receive crypto

        //fetch Item
        Item memory item = items[_id];

        //require enough ether
        require(msg.value >= item.cost);

        //require item is in stock
        require(item.stock > 0);

        //create an order
        Order memory order = Order(block.timestamp, item);

        //Save order to chain
        //add Order for user
        orderCount[msg.sender]++; // <--Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        //substract stock
        items[_id].stock = item.stock - 1;

        //emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    //Withdraw funds
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
