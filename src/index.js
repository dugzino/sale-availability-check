const fetch = require('node-fetch');
const cheerio = require('cheerio');
const colors = require('colors');

// TO IGNORE
const urlBuilder = (url, path) => `${url}${path}`;
const defaultRetryTimer = 90e3; // = 90 seconds

// STUFF YOU CAN CUSTOMIZE
const customRetryTimer = 5e3; // Set the value you want
const RDC_ARTICLE_SEARCH = [
  { websiteName: 'RDC', articleName: '3080 RTX', url: 'https://www.rueducommerce.fr', path: '/r/3080-rtx-10go.html' },
  { websiteName: 'RDC', articleName: '3070 RTX', url: 'https://www.rueducommerce.fr', path: '/r/3070-rtx-8go.html' },
];

// SCRIPT - TO IGNORE
const searchFn = () => {
  Promise.all(
    RDC_ARTICLE_SEARCH.map(({ url, path, articleName }) => {
      return fetch(urlBuilder(url, path)).then((res) => searchRDC(res, url, articleName));
    })
  ).then((_) => {
    console.log();
    setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
  });
};

const searchRDC = (response, url, articleName) => {
  return response.text()
    .then((html) => cheerio.load(html)('.item__title a').map((_, el) => cheerio.load(html)(el).attr('href')).toArray())
    .then((_LINKS) => {
      return Promise.all(_LINKS.map((_LINK) => {
        return fetch(urlBuilder(url, _LINK))
          .then((response) => response.text())
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
      });
};

searchFn();
