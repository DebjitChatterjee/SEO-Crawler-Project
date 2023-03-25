const {crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')

// use process.argv for capturing command line arguements.

async function main() {

    //console.log(process.argv)
    
    if(process.argv.length < 3 || process.argv.length > 3) {
        console.log(`invalid number of args provided.`)
        process.exit(1)
    }
    console.log(`Crawling the website now ...`)

    const baseURL = process.argv[2]
    const pages = await crawlPage(baseURL, baseURL, {})

    printReport(pages)
}




main()