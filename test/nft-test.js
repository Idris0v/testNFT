const { expect } = require("chai");

describe("TestNFT", function () {
  it("Should reset _tokenPrice with a new value", async function () {
    const TestNFT = await ethers.getContractFactory("TestNFT");
    const testNFT = await TestNFT.deploy('10000000000000000');
    await testNFT.deployed();

    expect(await testNFT._tokenPrice()).to.equal('10000000000000000');

    const changeTokenPriceTx = await testNFT.changeTokenPrice('1000000000000000000');

    // wait until the transaction is mined
    await changeTokenPriceTx.wait();

    expect(await testNFT._tokenPrice()).to.equal('1000000000000000000');
  });

  it("should buy a token", async function () {
    const TestNFT = await ethers.getContractFactory("TestNFT");
    const testNFT = await TestNFT.deploy('10000000000000000');
    await testNFT.deployed();

    const [owner, addr1] = await ethers.getSigners();
    await testNFT.buyToken({
        value: ethers.utils.parseEther("1.0")
    });
    const tokenId = await testNFT.getLastTokenId();
    expect(await testNFT.balanceOf(owner)).to.equal('1');
    expect(await testNFT.ownerOf(tokenId)).to.equal(owner);
  });
  
  it("should buy 10 tokens", async function () {
    const TestNFT = await ethers.getContractFactory("TestNFT");
    const testNFT = await TestNFT.deploy('10000000000000000');
    await testNFT.deployed();

    const [owner, addr1] = await ethers.getSigners();
    await testNFT.buyToken({
        value: ethers.utils.parseEther("1.0")
    });
    const tokenId = await testNFT.getLastTokenId();
    expect(await testNFT.balanceOf(owner)).to.equal('1');
    expect(await testNFT.ownerOf(tokenId)).to.equal(owner);
  });
});
