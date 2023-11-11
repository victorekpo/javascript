const cheerio = require('cheerio');
const request = require('request');
const fs = require('node:fs');

// a fast flexible & lean implementation of core jQuery designed specifically for the server

request('https://devblogs.microsoft.com/typescript/', (error, response, html) => {
  if(!error && response.statusCode == 200) {
    // console.log("Response in HTML:\n", html)
    const $ = cheerio.load(html);
    const siteHeading = $('.herocontent');
    console.log("SITE HEADING", siteHeading.html());
    console.log("SITE HEADING text", siteHeading.text());
    const output =
    console.log("OUTPUT", siteHeading
      .find('h1').text());
    console.log("OUTPUT 2", siteHeading
      .children('h1')
      .parent()
      .text());
    console.log("OUTPUT 3", siteHeading
      .children('h1')
      .next()
      .text());


  } else {
    console.error(`error occured ${JSON.stringify(error)}`)
  }
})