const sortPages = (pages) => {
    //getting all the values here in an array.
    const pagesArr = Object.entries(pages)
    
    pagesArr.sort((a,b) => {
        return b[1] - a[1]
    })
    
    return pagesArr
}

const printReport = (pages) => {
    
    console.log(`=======================================================`)
    console.log(`CRAWL REPORT`)
    console.log(`=======================================================`)

    const sortedPages = sortPages(pages)

    for(const page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
        console.log(`==================END REPORT===============================`)

}


module.exports = {
    sortPages,
    printReport
}