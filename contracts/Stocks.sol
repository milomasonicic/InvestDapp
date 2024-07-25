// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Stocks is ERC20 {

    uint256[] public participants;
    mapping(uint256 => bool) public isParticipant;
    mapping(uint256=>mapping(uint256=>uint256)) public userTokenBalance;
    mapping(uint256=>uint256) public companyTotalBalance;

    constructor() ERC20("ShareStocks", "SBT") {

    }

    function deposit(uint256 userId, uint256 companyId) external payable {

        require(msg.value > 0, "You have to invest some ETH");

        if(!isParticipant[userId]) {
            participants.push(userId);
            isParticipant[userId] = true;
        }
        _mint(msg.sender, msg.value);
        userTokenBalance[userId][companyId] +=msg.value;
        companyTotalBalance[companyId] +=msg.value;
    }

    function getUserTokenBalance(uint256 userId, uint256 companyId) public view returns(uint256){
        return userTokenBalance[userId][companyId];
    }

    function buyTokens( uint256 buyerUserId, uint256 numberOfTokens, uint256 sellerUserId, address sellerAddress, uint256 companyId) public payable{

        require(numberOfTokens > 0, "You must invest more than 0");
        require(msg.value == numberOfTokens, "Must be same as price");
        require(balanceOf(sellerAddress) >= numberOfTokens, "Must have enough ETH");

        if(!isParticipant[sellerUserId]) {
            participants.push(sellerUserId);
            isParticipant[sellerUserId] = true;
        }

        _transfer(sellerAddress, msg.sender, numberOfTokens);
        userTokenBalance[buyerUserId][companyId] += numberOfTokens;
        userTokenBalance[sellerUserId][companyId] -= numberOfTokens;

        payable(sellerAddress).transfer(msg.value);
    }

    function getCompanyTotalBalance(uint256 companyId) public view returns(uint256) {
        return companyTotalBalance[companyId];
    }
}
