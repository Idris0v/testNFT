const { expect } = require("chai");

describe("TestNFT", function () {
    let testNFT;

    beforeEach(async () => {
        const TestNFT = await ethers.getContractFactory("TestNFT");
        testNFT = await TestNFT.deploy('10000000000000000');
        await testNFT.deployed();
      });
    
  it("Should reset _tokenPrice with a new value", async function () {
    expect(await testNFT._tokenPrice()).to.equal('10000000000000000');

    const changeTokenPriceTx = await testNFT.changeTokenPrice('1000000000000000000');

    await changeTokenPriceTx.wait();

    expect(await testNFT._tokenPrice()).to.equal('1000000000000000000');
  });

  it("should buy a token", async function () {
    const [owner, addr1] = await ethers.getSigners();
    await testNFT.buyToken({
        value: ethers.utils.parseEther("0.01")
    });
    const tokenId = await testNFT.getLastTokenId();
    expect(await testNFT.balanceOf(owner)).to.equal('1');
    expect(await testNFT.ownerOf(tokenId)).to.equal(owner);
  });
  
  it("should buy 10 tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();
    await testNFT.buyUpTo20Tokens({
        value: ethers.utils.parseEther("0.1")
    });
    const tokenId = await testNFT.getLastTokenId();
    expect(await testNFT.balanceOf(owner)).to.equal('10');
    expect(await testNFT.ownerOf(tokenId)).to.equal(owner);
  });
});
