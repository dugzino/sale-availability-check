import cheerio from 'cheerio';
import Axios, { AxiosResponse } from 'axios';

import { articleAvailability, urlBuilder } from '../../utils';
import { searchParamsType, searchSchemaType } from '../services.types';

const WEBSITE_HANDLE = 'RDC';
const WEBSITE_URL = 'https://www.rueducommerce.fr';
const searchBuilder = (path) => `${WEBSITE_URL}/r/${path}.html`;

export class RueDuCommerce {
  axios: any;
  searchParams: searchParamsType;
  articleLinks: any;

  constructor(searchArray: searchSchemaType) {
    this.axios = Axios.create();
    this.searchParams = paramsBuilder(searchArray);
    this.articleLinks = null; // Object? Storing article links to lessen the amount of calls
  }

  runChecks () {
    if (this.articleLinks) return this.getAvailability();

    return this.searchParams.map(({ path, articleName }) => {
      return this.axios.get(searchBuilder(path))
        .then(this.getLinks)
        .then((links) => {
          if (!this.articleLinks) this.articleLinks = {};
          this.articleLinks[articleName] = links;
        });
      });
  }

  getLinks (response: AxiosResponse): any[] {
    const $ = cheerio.load(response.data);
    return $('.item__title a').map((_, el) => $(el).attr('href')).toArray();
  }

  getAvailability () {
    return Object.keys(this.articleLinks).forEach((key) => {
      return Promise.all(this.articleLinks[key].map((link) => {
        return this.axios.get(urlBuilder(WEBSITE_URL, link))
          .then(({ data: html }) => !cheerio.load(html)('#product_action a').first().toString().includes('display:none'))
          .then((isAvailable) => {
            articleAvailability(key, urlBuilder(WEBSITE_URL, link), isAvailable);
            return isAvailable;
          });
      }));
    })
  }
}

const searchCase = (search: string): string => search.split(' ').filter(Boolean).join('-');

const paramsBuilder = (array: searchSchemaType): searchParamsType => {
  return array
    .filter(Boolean)
    .map(({ articleName, search }) => ({ articleName, path: searchCase(search) }));
}
