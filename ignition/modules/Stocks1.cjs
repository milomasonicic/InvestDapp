const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const stockstoken1 = buildModule("StocksToken1", (m) => {

  
  const stocks = m.contract("Stocks1");

  return { stocks };

})

module.exports = stockstoken1