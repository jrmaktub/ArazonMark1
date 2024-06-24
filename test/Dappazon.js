const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Arazon", () => {

  let arazon

  beforeEach(async () => {
    //Setup Accounts
    console.log(await ethers.getSigners())

    //Deploy
    const Arazon = await ethers.getContractFactory("Arazon")
    arazon = await Arazon.deploy()

  })

  describe("Deployment", () => {

    it('has a name', async() =>{

      expect(await arazon.name()).to.equal("Arazon")
    })

  })



})
