const { customRetryTimer, websiteService } = require('./config/index');

const { logger } = require('./utils');

// 30 minutes; Lowering might trigger the website's
const defaultRetryTimer = 18e5;

// The first run of script is used only to save the list of articles' individual pages
let firstRun = true;

const searchFn = () => {
  Promise
    .all([websiteService.runChecks()].flatMap((v) => v))
    .then((_) => {
      if (!firstRun) {
        logger('');
        return setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
      }
      firstRun = false;
      searchFn();
    });
};

searchFn();
