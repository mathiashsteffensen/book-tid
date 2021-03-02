const puppeteer = require('puppeteer')

class Scraper {
    
    constructor({
        scrapeFrom,
        keyword,
        leadsToGather,
        headless = false
    }) {

        switch(scrapeFrom) {
            case 'cvr':
                this.TARGET_URI = (keyword) =>
                {
                    return `https://datacvr.virk.dk/data/visninger?soeg=${keyword}&oprettet=null&ophoert=false&type=virksomhed&sortering=default&language=da`
                }

                this.TARGET_ITEM = 'div.item.virk'

                this.LINK_SELECTOR = 'h2.name a'
                break;
            default:
                throw new Error('Unknown scrape target')
        }

        this.keyword = keyword

        this.limit = leadsToGather

        this.headless = headless

        this.leads = []

    }


    async run() {

        const browser = await puppeteer.launch({ headless: Boolean(this.headless) })

        const page = (await browser.pages())[0]


        await Promise.all([
            page.goto(this.TARGET_URI(this.keyword)),
            page.waitForNavigation({waitUntil: 'domcontentloaded'})
        ])
        
        const targetItems = await page.$$(this.TARGET_ITEM)
        
        for (let i = 0; i < targetItems.length; i++) {
            console.log(i);
            
            const link = (await (await targetItems[i].$(this.LINK_SELECTOR)).getProperty('href'))._remoteObject.value

            await this.parsePage(link, browser)

        }

        console.log(this.leads);

        return this.leads
    }

    async parsePage(link, browser) {
        const page = await browser.newPage()

        await Promise.all([
            page.goto(link),
            page.waitForNavigation({waitUntil: 'domcontentloaded'})
        ])

    }
}

module.exports = Scraper