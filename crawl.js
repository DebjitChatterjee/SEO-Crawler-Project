const {JSDOM} = require('jsdom')

const normalizeURL = (urlString) => {
    const url = new URL(urlString)

    // URL class takes care of the casing. so , no extra work.
    
    const ans = `${url.hostname}${url.pathname}`

    if(ans.length > 0 && ans.slice(-1) === '/') {
        return ans.slice(0,-1)
    }
    return ans
}

const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody)

    const linkElements = dom.window.document.querySelectorAll('a')

    const links = []
    for(link of linkElements) {
        if(link.href.slice(0,1) === '/') { // 1st letter is '/'
            // relative url
            try {
                const urlString = new URL(baseURL+link.href)
                links.push(urlString.href)
            }
            catch(err) {
                console.log(`Error in the relative path :${err.message}`)
            }
        }
        else {
            // absolute
            try {
                const urlString = new URL(link.href)
                links.push(urlString.href)
            }
            catch(err) {
                console.log(`Error in the absolute path :${err.message}`)
            }
        }
    }
    return links
}

async function crawlPage(baseURL, currentURL, pages) 
    {

        const base = new URL(baseURL)
        const current = new URL(currentURL)

        if(base.hostname !== current.hostname) {
            return pages
        }
        
        //console.log(`current URL is ${currentURL}`)
        const currentNormalizedURL = normalizeURL(currentURL)
        //console.log(`current normalized URL is ${currentNormalizedURL}`)
        
        if(pages[currentNormalizedURL] >= 1) {
            pages[currentNormalizedURL] += 1
            return pages
        }
        
        console.log(`... Crawling ${currentURL} ....`)
        pages[currentNormalizedURL] = 1
        
        try{
            const response = await fetch(currentURL)

           //checking the status code:
            if(response.status < 200 || response.status > 399) {
                console.log(`error in fetch with status code: ${response.status} for the page: ${currentURL}`)
                return pages
            }

            const contentType = response.headers.get('content-type')
            if(!contentType.includes('text/html')) {
                console.log(`non html type response with content type ${contentType} for the page: ${currentURL}`)
                return pages
            }
            // .text() returns a promise. We need to handle that via await.
            const htmlBody = await response.text()

            const linksList = getURLsFromHTML(htmlBody, baseURL)

            for(const links of linksList) {
                pages = await crawlPage(baseURL, links, pages)
            }
        }
        catch(err) {
            console.log(`Problem in fetch: ${err.message}`)
        }

        return pages
    }















module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}