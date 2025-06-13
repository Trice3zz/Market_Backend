import client from "./client.js";
import { createProduct } from "./queries/products.js";

await client.connect()
await seed()
await client.end()


async function seed() {
    await createProduct("Rubber Duck", "The classic rubber ducky", "Duck.jpg", 1.99)
    await createProduct("Dapper Duck", "This distinguished little gentleman is wearing a suit and tie", "Duck.jpg", 9.99)
    await createProduct("Zombie Duck", "Not dead, not alive, but a secret third thing", "Duck.jpg", 2.99)
    await createProduct("Sir Ducklington", "A duck in shining armor ready to slay the mighty Dragon", "Duck.jpg", 1.99)
    await createProduct("Bat Duck", "DUNANANANANANANANANANANA BAT DUCKKKKK!", 1.99)
    await createProduct("Real Duck", "Literally just a real duck. How'd this get in here?", "https://www.google.com/search?q=duck&sca_esv=4e55f75f497bcb4a&udm=2&biw=1229&bih=622&ei=8oVLaO3HJr6gkPIPn-_hgAk&ved=0ahUKEwjtiIalpu2NAxU-EEQIHZ93GJAQ4dUDCBE&uact=5&oq=duck&gs_lp=EgNpbWciBGR1Y2syChAAGIAEGEMYigUyDRAAGIAEGLEDGEMYigUyChAAGIAEGEMYigUyChAAGIAEGEMYigUyCxAAGIAEGLEDGIMBMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFSPMRUN4JWOQOcAF4AJABAJgBR6ABjwKqAQE0uAEDyAEA-AEBmAIEoAKYAqgCAMICCBAAGIAEGLEDwgIFEAAYgASYAwGSBwE0oAfnE7IHATS4B5gCwgcDMC40yAcI&sclient=img#imgrc=SdGxGNp468jIeM&imgdii=Rr_9EliCBBfmOM", 0.00)
    await createProduct("Cowboy Duck", "YEEEEE HAAAAW!", "Duck.jpg", 1.99)
    await createProduct("Unicorn Duck", "The most magical of all the ducks", "https://www.google.com/search?q=unicorn+rubber+ducky&sca_esv=4e55f75f497bcb4a&udm=2&biw=1229&bih=622&ei=p4VLaPblMZHZkPIP85Hb0Q4&oq=unicorn+&gs_lp=EgNpbWciCHVuaWNvcm4gKgIIADIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzINEAAYgAQYsQMYQxiKBTILEAAYgAQYsQMYgwEyCBAAGIAEGLEDMgoQABiABBhDGIoFMggQABiABBixA0iBIFAAWKYRcAB4AJABAJgBRaABjASqAQE4uAEByAEA-AEBmAIIoAKbBMICDhAAGIAEGLEDGIMBGIoFmAMAkgcBOKAH_ymyBwE4uAebBMIHAzAuOMgHDQ&sclient=img#vhid=lZQSINoKjm_S0M&vssid=mosaic", 7.77)
    await createProduct("Rubber Duck???", "I don't like this one", "https://www.google.com/search?q=dread+ducky+dark+deception&sca_esv=4e55f75f497bcb4a&udm=2&biw=1229&bih=622&ei=9oJLaMmgEvXGkPIP1sCqGA&oq=dread+ducky+dark&gs_lp=EgNpbWciEGRyZWFkIGR1Y2t5IGRhcmsqAggAMgUQABiABDIGEAAYCBgeMgYQABgIGB4yBhAAGAgYHjIGEAAYCBgeSNNNUMMGWJY_cAR4AJABAJgBSKABrAmqAQIxObgBAcgBAPgBAZgCEaACmQioAgDCAgoQABiABBhDGIoFwgIREAAYgAQYsQMYgwEYxwMYigXCAgsQABiABBixAxiDAcICCBAAGIAEGLEDwgIOEAAYgAQYsQMYgwEYigXCAgwQABiABBhDGIoFGArCAgQQABgemAMA4gMFEgExIECSBwIxN6AHoFKyBwIxNrgHmAjCBwYwLjE1LjLIBx8&sclient=img#vhid=CpBKgSB2K4xK6M&vssid=mosaic", 6.66)
    await createProduct("Rainbow Duck", "So colorful that it hurts my eyes", "https://www.google.com/search?q=rainbow+rubber+duck&sca_esv=4e55f75f497bcb4a&udm=2&biw=1229&bih=622&ei=qn9LaPN91p66vw_67-e5AQ&oq=rainrubber+duck&gs_lp=EgNpbWciD3JhaW5ydWJiZXIgZHVjayoCCAAyBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMggQABgHGAgYHjIIEAAYBxgIGB4yCBAAGAcYCBgeMggQABgHGAgYHjIIEAAYBxgIGB5ImClQ1gxYhBxwA3gAkAEAmAFRoAGOA6oBATa4AQHIAQD4AQGYAgigAs0CwgINEAAYgAQYsQMYQxiKBcICCBAAGIAEGLEDwgIFEAAYgATCAggQABgFGAcYHsICBhAAGAUYHsICBhAAGAgYHpgDAIgGAZIHATigB-AisgcBNbgHxQLCBwUwLjcuMcgHDw&sclient=img#vhid=iVly5D13jixJ5M&vssid=mosaic", 1.99)

    console.log("Database seeded")
}

