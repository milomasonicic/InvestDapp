// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract StocksToken2 is ERC20 {

    uint256[] public participants;
    uint256[] public companies;
    mapping(uint256 => bool) public isCompany;
    mapping(uint256 => bool) public isParticipant;
    mapping(uint256 => mapping(uint256=> uint256)) public userTokenBalance;
    mapping(uint256=>uint256) public companyTotalBalance;
    mapping(uint256=>string) public companyNames;

    constructor() ERC20("StockToken", "STC"){

    }

    function deposit(uint256 userId, uint256 companyId, string memory companyName) external payable {

        require(msg.value > 0, "You have to invest some ETH");

           //add Pariticipant
        if(!isParticipant[userId]) {
            participants.push(userId);
            isParticipant[userId] = true;
        }

        //add cmp + name
        
        if (!isCompany[companyId]) {
            companies.push(companyId);
            isCompany[companyId] = true;
            companyNames[companyId] = companyName;
        }
        _mint(msg.sender, msg.value);
        userTokenBalance[userId][companyId] +=msg.value;
        companyTotalBalance[companyId] +=msg.value;
    }

    //userTokenBalancePerCOmpany
    function getUserTokenBalance(uint256 userId, uint256 companyId) public view returns(uint256){
        return userTokenBalance[userId][companyId];
    }

    //buySellFunction
    function buyTokens( uint256 buyerUserId, uint256 numberOfTokens, 
    uint256 sellerUserId, address sellerAddress, uint256 companyId) public payable{

        require(numberOfTokens > 0, "You must invest more than 0");
        require(msg.value == numberOfTokens, "Must be same as price");
        require(balanceOf(sellerAddress) >= numberOfTokens, "Seller must have enough token to sell");
        
          if(!isParticipant[buyerUserId]) {
            participants.push(buyerUserId);
            isParticipant[buyerUserId] = true;
        }

        _transfer(sellerAddress, msg.sender, numberOfTokens);
        userTokenBalance[buyerUserId][companyId] += numberOfTokens;
        userTokenBalance[sellerUserId][companyId] -= numberOfTokens;

        payable(sellerAddress).transfer(msg.value);
    }

    //company Balance, function called on the companyProfle page
    function getCompanyTotalBalance(uint256 companyId) public view returns(uint256) {
        return companyTotalBalance[companyId];
    }

    //structs
    struct CompanyInfo{
        uint256 id;
        string name;
    }

    struct ParticipantOwnership{
        uint256 userId;
        uint256 ownershipPercentage;       
    }

    //checkUserCompanies + Names
    function getUserInvestedCompanies(uint256 userId) public view returns(CompanyInfo[] memory) 
    {
 
    uint256 companiesNum = companies.length;
    uint count = 0;
    
    for (uint256 i= 0; i < companiesNum; i++){
        if (userTokenBalance[userId][companies[i]] > 0){
            count++;
        }
    }
    
    //create returning struct
    CompanyInfo[] memory investedCompanies = new CompanyInfo[](count);
    uint256 index = 0;
    

    for (uint256 i = 0; i < companiesNum; i++){
        if (userTokenBalance[userId][companies[i]] > 0){
            investedCompanies[index] = CompanyInfo({
                    id: companies[i],
                    name: companyNames[companies[i]]
            });
            index++;
        }
    }
    
    return investedCompanies;
}

      function getUserBalance(uint256 userId) public view returns (uint256) {
        uint256 totalBalance = 0;
        uint256 companiesNum = companies.length;

         for (uint256 i = 0; i < companiesNum; i++) {
            totalBalance += userTokenBalance[userId][companies[i]];
        }

        return totalBalance;
    }

    //company ownership structure
  
    function getCompanyOwnership(uint256 companyId) public view returns(ParticipantOwnership[] memory)
    {
        uint256 totalBalance = companyTotalBalance[companyId];
        uint256 count = 0;

        //get num of investors
        for(uint256 i = 0; i< participants.length; i++)
        {
            if(userTokenBalance[participants[i]][companyId] > 0)
            {
                count ++;
            }
        }

        //inicialize Struct
        ParticipantOwnership[] memory ownerships = new ParticipantOwnership[](count);
        uint256 index = 0;

        for(uint256 i = 0; i<participants.length; i++)
        {
            uint256 userBalance = userTokenBalance[participants[i]][companyId];

            if(userBalance > 0 )
            {
                uint256 percentage = (userBalance * 100) / totalBalance;
                ownerships[index] = ParticipantOwnership({
                    userId: participants[i],
                    ownershipPercentage: percentage
                });

                index++;
            }
        }

    return ownerships;
    }
}