// Import website you want to use

// TO IGNORE
const defaultRetryTimer = 90e3; // = 90 seconds

// STUFF YOU CAN CUSTOMIZE
const customRetryTimer = null; // Set the value you want
const searchArray = [];

// SCRIPT - TO IGNORE
const searchFn = () => {
  Promise.all([
    rueDuCommerce.runChecks(),
  ].flatMap(v => v)).then((_) => {
    console.log();
    setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
  });
};

searchFn();
