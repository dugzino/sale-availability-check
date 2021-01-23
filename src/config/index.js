const { websiteService } = require('./search-params');
const { customRetryTimer } = require('./utils');

module.exports = {
  websiteService: websiteService || null,
  customRetryTimer: customRetryTimer || null,
}
