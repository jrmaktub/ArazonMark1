const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Arazon", () => {

  let arazon
  let deployer, buyer

  beforeEach(async () => {
    //Setup Accounts
    [deployer, buyer] = await ethers.getSigners()
    console.log(deployer.address, buyer.address)

    //Deploy
    const Arazon = await ethers.getContractFactory("Arazon")
    arazon = await Arazon.deploy()

  })

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await arazon.owner()).to.equal(deployer.address)
    })
  })

  describe("Listing", () => {

    let transaction 

    beforeEach(async () => {
      transaction = await arazon.connect(deployer).list(
        1,
        "Shoes",
        "Clothing",
        "IMAGE",
        1,
        4,
        5
      )

      await transaction.wait()

    })

    it("returns item attributes", async () => {
      const item = await arazon.items(1)
      expect(item.id).to.equal(1)
    })
  })



})
