const cheerio = require('cheerio');
const fetch = require('node-fetch');

const {
  articleAvailability,
  urlBuilder,
} = require('../../utils');

const WEBSITE_HANDLE = 'RDC';
const WEBSITE_URL = 'https://www.rueducommerce.fr';
const searchBuilder = (path) => `${WEBSITE_URL}/r/${path}.html`;

class RueDuCommerce {
  constructor(searchArray, options) {
    this.searches = paramsBuilder(searchArray);
    this.articleLinks = null; // Object? Storing article links to lessen the amount of calls
  }

  runChecks () {
    if (this.articleLinks) return this.getAvailability();

    return this.searches.map(({ path, articleName }) => {
      return fetch(searchBuilder(path))
        .then((response) => this.getLinks(response, articleName))
        .then((links) => {
          if (!this.articleLinks) this.articleLinks = {};
          this.articleLinks[articleName] = links;
        });
      });
  }

  getLinks (response, articleName) {
    return response.text()
      .then((html) => {
        const $ = cheerio.load(html);
        return $('.item__title a').map((_, el) => $(el).attr('href')).toArray();
      });
  }

  getAvailability () {
    return Object.keys(this.articleLinks).forEach((key) => {
      return Promise.all(this.articleLinks[key].map((link) => {
        return fetch(urlBuilder(WEBSITE_URL, link))
          .then(getHtml)
          .then((html) => !cheerio.load(html)('#product_action a').first().toString().includes('display:none'))
          .then((isAvailable) => {
            articleAvailability(key, urlBuilder(WEBSITE_URL, link), isAvailable);
            return isAvailable;
          });
      }));
    })
  }
}

const getHtml = (res) => res.text();
const searchCase = (search) => search.split(' ').filter(Boolean).join('-');

const paramsBuilder = (array) => {
  return array
    .filter(Boolean)
    .map(({ articleName, search }) => ({ articleName, path: searchCase(search) }));
}

module.exports = { RueDuCommerce };
