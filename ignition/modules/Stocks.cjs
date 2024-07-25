const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const stockstoken = buildModule("StocksToken", (m) => {

  
  const stocks = m.contract("Stocks");

  return { stocks };

})

module.exports = stockstoken