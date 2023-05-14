const Picture = artifacts.require("PictureNFT");

async function showCostOf(tx) {
    const txHash = (await tx).transactionHash;
    const receipt = await web3.eth.getTransactionReceipt(txHash);

    const gasUsed = new web3.utils.BN(receipt.gasUsed);
    console.log(`====`);
    console.log(`利用したガス: ${gasUsed}`);
    const gasPrice = new web3.utils.BN(receipt.effectiveGasPrice);
    console.log(`ガス代: ${web3.utils.fromWei(gasPrice, "gwei")} gwei`);
    console.log(`合計 ${web3.utils.fromWei(gasUsed.mul(gasPrice))} ETH`);
}

contract("Picture NFT の消費ガス", ([deployer]) => {
    it("コントラクトのデプロイ", async () => {
        await showCostOf(Picture.new({ from: deployer }));
    });

    it("トークンのミント", async function () {
        const instance = await Picture.deployed();
        await showCostOf(instance.contract.methods
            .mint("QmTiJXEayojHD2sxmCBCs4fFi6iFEUMNtds2qGiVwhXMQc")
            .send({ from: deployer, to: instance.address, gas: 500000 }));
    });
});

contract("Picture NFT の動作確認", () => {
    it("tokenURI のテスト", async () => {
        const instance = await Picture.deployed();

        // まだトークンを発行していない。
        const supplyBefore = await instance.totalSupply();
        assert.equal(supplyBefore, 0);

        // トークンを発行する。
        const cid = "QmTiJXEayojHD2sxmCBCs4fFi6iFEUMNtds2qGiVwhXMQc";
        await instance.mint(cid);

        // 発行されたトークンの tokenURI は ipfs://CID になっている。
        const tokenURI = await instance.tokenURI(1);
        assert.equal(tokenURI, `ipfs://${cid}`);

        // トークンを 1 つ発行した。
        const supplyAfter = await instance.totalSupply();
        assert.equal(supplyAfter, 1);
    });
});
