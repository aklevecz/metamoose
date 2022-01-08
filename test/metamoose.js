const { expect } = require("chai");
const { ethers } = require("hardhat");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const tokenIds = [];
for (let i = 0; i < 200; i++) {
  tokenIds.push(i);
}
const shuffled = shuffle(tokenIds);

describe("MetaMoose", function () {
  beforeEach(async function () {
    this.MetaMoose = await ethers.getContractFactory("MetaMoose");
    this.metamoose = await this.MetaMoose.deploy(shuffled);
    this.accounts = await ethers.getSigners();
    this.owner = this.accounts[0];

    await this.metamoose.deployed();
  });

  it("Name and symbol are Metamoose and MM", async function () {
    const name = await this.metamoose.name();
    const symbol = await this.metamoose.symbol();

    expect(name).to.equal("MetaMoose");
    expect(symbol).to.equal("MM");
  });

  it("Mints the first token in the array", async function () {
    await this.metamoose.mintMoose();
    const ownerOfMoose = await this.metamoose.ownerOf(shuffled[0]);
    expect(ownerOfMoose).to.equal(this.owner.address);
  });

  it("Shows how many are remaining", async function () {
    await this.metamoose.mintMoose();
    const totalSupply = parseInt(await this.metamoose.TOTAL_SUPPLY());
    const remaining = parseInt(await this.metamoose.amountRemaining());
    expect(remaining).to.equal(totalSupply - 1);
  });

  it("Reverts if soldout", async function () {
    for (let i = 0; i < 200; i++) {
      this.metamoose.mintMoose();
    }
    await expect(this.metamoose.mintMoose()).to.be.revertedWith("Soldout");
  });
});
