const Picture = artifacts.require("PictureNFT");

module.exports = function (_deployer) {
    _deployer.deploy(Picture);
};
