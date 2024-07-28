const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const own2 = buildModule("own2", (m) => {

  
  const stocks = m.contract("StocksToken2");

  return { stocks };

})

module.exports = own2