
const { networkInterfaces } = require('os');

const getNetworkAddresses = () => {
  const nets = networkInterfaces();
  return Object.keys(nets).map(name => nets[name].filter(({ family }) => (family === 'IPv4')).map(({ address }) => address)).flat();
};

module.exports = { getNetworkAddresses };
