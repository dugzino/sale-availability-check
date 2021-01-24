const { customRetryTimer, websiteService } = require('./config/index');

const { logger } = require('./utils');

const defaultRetryTimer = 1800e3; // = 1800 seconds === 30 minutes

const searchFn = () => {
  Promise
    .all([websiteService.runChecks()].flatMap((v) => v))
    .then((_) => {
      logger('');
      setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
    });
};

searchFn();
