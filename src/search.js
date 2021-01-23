const { RueDuCommerce } = require('./websites/rue-du-commerce');

// TO IGNORE
const defaultRetryTimer = 90e3; // = 90 seconds

// STUFF YOU CAN CUSTOMIZE
const customRetryTimer = 5e3; // Set the value you want
const searchArray = [
  { articleName: '3080 RTX', search: '3080-rtx-10go' },
  { articleName: '3070 RTX', search: '3070-rtx-8go' },
];
const rueDuCommerce = new RueDuCommerce(searchArray);

// SCRIPT - TO IGNORE
const searchFn = () => {
  Promise.all([
    rueDuCommerce.runChecks(),
  ].flatMap(x => x)).then((_) => {
    console.log();
    setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
  });
};

searchFn();
