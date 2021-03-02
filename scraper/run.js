const Scraper = require('./Scraper')

const scraper = new Scraper({
    scrapeFrom: 'cvr',
    keyword: 'frisør',
    headless: false
})

scraper.run()