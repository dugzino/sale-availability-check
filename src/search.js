// Import website you want to use

// TO IGNORE
const defaultRetryTimer = 90e3; // = 90 seconds

// STUFF YOU CAN CUSTOMIZE
const customRetryTimer = null; // Set the value you want

const searchArray = [
  // Put here whatever's suggested in the website you want to check's README file
];

const searchFn = () => {
  const searches = [
    // Put here whatever's suggested in the website you want to check's README file
  ];

  if (!searchArray.length) return console.log(`You forgot to setup in the searchArray. Check the README files for more info.`);
  if (!searches.length) return console.log(`You forgot to setup in the searches. Check the README files for more info.`);

  Promise
    .all(searches.flatMap((v) => v))
    .then((_) => {
      console.log();
      setTimeout(searchFn, customRetryTimer || defaultRetryTimer);
    });
};

searchFn();
