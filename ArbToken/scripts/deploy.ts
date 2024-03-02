import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("ChessToken", ["0xA94a5D26DDbB83cf919e679708ce3AB99c2919CB"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});