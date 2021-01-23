const { customRetryTimer, websiteService } = require('./config/index');

const defaultRetryTimer = 90e3; // = 90 seconds

const searchFn = () => {
  Promise
    .all([websiteService.runChecks()].flatMap((v) => v))
    .then((_) => {
      console.log();
      setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
    });
};

searchFn();
