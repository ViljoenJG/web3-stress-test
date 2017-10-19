pragma solidity ^0.4.16;

contract Lookup {
    address owner;
    mapping (bytes8 => bytes32) values;
    uint index;

    event SetEvent(address indexed from, bytes8 key,bytes32 value);

    function() {
        owner = msg.sender;
        index = 0;
    }

    function get(bytes8 key) public constant returns (bytes32) {
        return values[key];
    }

    function getIndex() public constant returns (uint) {
        return index;
    }

    function getTheIndex() public constant returns (uint) {
        return index;
    }

    function set(bytes8 key,bytes32 value) public {
        SetEvent(msg.sender,key,value);
        values[key]=value;
        index = index + 1;
    }

    function kill() {
        if (msg.sender == owner) {
            suicide(owner);
        }
    }
}