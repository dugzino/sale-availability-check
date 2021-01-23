const cheerio = require('cheerio');
const fetch = require('node-fetch');
const colors = require('colors');

const { urlBuilder } = require('../../utils');

const HANDLE = 'RDV';
const URL = 'https://www.rueducommerce.fr';

// Read the README file for info
class RueDuCommerce {
  constructor (searchArray, options) {
    this.searches = paramsBuilder(searchArray);
  }

  runChecks () {
    return this.searches.map(({ url, path, articleName }) => fetch(urlBuilder(url, path))
      .then(this.getLinks)
      .then((links) => this.getAvailability(links, url, articleName)))
  }

  getLinks (response) {
    return response.text()
      .then((html) => {
        const $ = cheerio.load(html);
        return $('.item__title a').map((_, el) => $(el).attr('href')).toArray();
      })
  }

  getAvailability (links, url, articleName) {
    return Promise.all(links.map((_LINK) => {
      return fetch(urlBuilder(url, _LINK))
        .then(getHtml)
        .then((html) => !cheerio.load(html)('#product_action a').first().attr('style', 'display:none;'))
        .then((isAvailable) => {
          if (isAvailable) {
            console.log(`${articleName}:`, `${urlBuilder(url, _LINK)}`.white.bgGreen);
          } else {
            console.log(`${articleName}:`, `${urlBuilder(url, _LINK)}`.white.bgRed);
          }
          return isAvailable;
        });
      }));
    }
}

const getHtml = (res) => res.text();

const paramsBuilder = (array) => {
  return array
    .filter(Boolean)
    .map(({ articleName, search}) => ({ websiteName: HANDLE, articleName, url: URL, path: `/r/${search}.html` }));
}

module.exports = { RueDuCommerce };
