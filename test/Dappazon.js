const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
const COST = tokens(1)
const RATING = 4
const STOCK = 5

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
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )

      await transaction.wait()

    })

    it("returns item attributes", async () => {
      const item = await arazon.items(ID)

      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)


    })


    it("Emits item attributes", () => {
      expect(transaction).to.emit(arazon, "List")
    })


  })



})
