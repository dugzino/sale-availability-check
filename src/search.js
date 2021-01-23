// Import website you want to use

// TO IGNORE
const defaultRetryTimer = 90e3; // = 90 seconds

// STUFF YOU CAN CUSTOMIZE
const customRetryTimer = null; // Set the value you want

const searchArray = [];
const searches = [];

// SCRIPT - TO IGNORE
const searchFn = () => {
  if (!searchArray.length) return console.log(`You didn't setup anything to search yet. Check the README files for more info.`);

  Promise
    .all(searches.flatMap(v => v))
    .then((_) => {
      console.log();
      setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
    });
};

searchFn();
