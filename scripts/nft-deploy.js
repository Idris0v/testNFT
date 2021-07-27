const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('../artifacts/contracts/TestNFT.sol/TestNFT.json')

const provider = new HDWalletProvider(
    'across catch biology very vivid fee blush company regret welcome surface agent',
    'https://rinkeby.infura.io/v3/b3357c11ce3743e2a0b85e9365745e9c'
)
const web3 = new Web3(provider)

const deploy = async () => {
    const account = await web3.eth.getAccounts().then((accs) => accs[0])
    // console.log('attempting to deploy from acc', account);
    console.log(compiledFactory.abi);

    const contract = await new web3.eth.Contract(JSON.parse(compiledFactory.abi))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: account, gas: 1000000 })

    console.log('deployed to address', contract.options.address);
}

deploy()


// const hre = require("hardhat");

// async function main() {
//   const TestNFT = await hre.ethers.getContractFactory("TestNFT");
//   const testNFT = await TestNFT.deploy('10000000000000000');
//   await testNFT.deployed();

//   console.log("TestNFT deployed to:", testNFT.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

