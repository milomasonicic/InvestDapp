// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Stocks1 is ERC20 {

    uint256[] public participants;
    uint256[] public companies;
    mapping(uint256 => bool) public isCompany;
    mapping(uint256 => bool) public isParticipant;
    mapping(uint256=>mapping(uint256=>uint256)) public userTokenBalance;
    mapping(uint256=>uint256) public companyTotalBalance;

    constructor() ERC20("ShareStocks", "SBT") {

    }

    function deposit(uint256 userId, uint256 companyId) external payable {

        require(msg.value > 0, "You have to invest some ETH");

           //add Pariticipant
        if(!isParticipant[userId]) {
            participants.push(userId);
            isParticipant[userId] = true;
        }

        //add cmp
        if(!isCompany[companyId]) {
            companies.push(companyId);
            isCompany[companyId] = true;
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
        
          if(!isParticipant[buyerUserId]) {
            participants.push(buyerUserId);
            isParticipant[buyerUserId] = true;
        }

        _transfer(sellerAddress, msg.sender, numberOfTokens);
        userTokenBalance[buyerUserId][companyId] += numberOfTokens;
        userTokenBalance[sellerUserId][companyId] -= numberOfTokens;

        payable(sellerAddress).transfer(msg.value);
    }

    function getCompanyTotalBalance(uint256 companyId) public view returns(uint256) {
        return companyTotalBalance[companyId];
    }

    //checkUserCompanies

    function getUserInvestedCompanies(uint256 userId) public view returns(uint256[] memory) {
 
    uint256 companiesNum = companies.length * 100;
    uint count = 0;
    
    for (uint256 companyId = 0; companyId < companiesNum; companyId++){
        if (userTokenBalance[userId][companyId] > 0){
            count++;
        }
    }
    
    uint256[] memory companyIds = new uint256[](count);
    uint256 index = 0;
    
    for (uint256 companyId = 0; companyId < companiesNum; companyId++){
        if (userTokenBalance[userId][companyId] > 0){
            companyIds[index] = companyId;
            index++;
        }
    }
    
    return companyIds;
}

  function getUserBalance(uint256 userId) public view returns (uint256) {
        uint256 totalBalance = 0;
        uint256 companiesNum = companies.length;

         for (uint256 i = 0; i < companiesNum; i++) {
            totalBalance += userTokenBalance[userId][companies[i]];
        }

        return totalBalance;
    }
}

