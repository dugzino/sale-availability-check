## How to use
In the search.js file here's how it should look like:

```js
// Between the imports
const { RueDuCommerce } = require('./websites/rue-du-commerce');

// Between the stuff you can customize
const searchArray = [
  { articleName: '3080 RTX', search: '3080-rtx-10go' }, // This is an example
  { articleName: '3070 RTX', search: '3070-rtx-8go' }, // This is an example
];
const rueDuCommerce = new RueDuCommerce(searchArray);

// As first in the searchFn function
const searchFn = () => {
  const searches = [
    rueDuCommerce.runChecks(),
  ];
```
**Try to be precise with the search's value**
