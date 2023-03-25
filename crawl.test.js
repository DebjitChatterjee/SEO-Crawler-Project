const { normalizeURL,getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL stripping protocol', () =>{
    const input = 'https://wagslane.dev/path'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'

    expect(actual).toEqual(expected)
})

test('normalizeURL stripping http protocol', () =>{
    const input = 'http://wagslane.dev/path'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'

    expect(actual).toEqual(expected)
})

test('normalizeURL stripping trailing slashes', () =>{
    const input = 'https://wagslane.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'

    expect(actual).toEqual(expected)
})

test('normalizeURL decapitalize', () =>{
    const input = 'https://WAGSlane.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'wagslane.dev/path'

    expect(actual).toEqual(expected)
})



test ('getURLsFromHTML absolute URLs', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
            <a href="https://google.com/">
                google link
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev/path/'

    const actual = getURLsFromHTML(inputHTML, inputBaseURL)

    const expected = ['https://blog.boot.dev/path/', 'https://google.com/']

    expect(actual).toEqual(expected)
})


test ('getURLsFromHTML relative URLs', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLsFromHTML(inputHTML, inputBaseURL)

    const expected = ['https://blog.boot.dev/path/']

    expect(actual).toEqual(expected)
})

test ('getURLsFromHTML both type URLs', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/path2/">
                Boot.dev Blog Path 2
            </a>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Path1
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLsFromHTML(inputHTML, inputBaseURL)

    const expected = ['https://blog.boot.dev/path2/', 'https://blog.boot.dev/path1/']

    expect(actual).toEqual(expected)
})

test ('getURLsFromHTML Invalid URLs', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="Invalid URL">
                Boot.dev Blog Path 2
            </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLsFromHTML(inputHTML, inputBaseURL)

    const expected = []

    expect(actual).toEqual(expected)
})



