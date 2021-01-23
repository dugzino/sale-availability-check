## How to use
In the search.js file here's how it should look like:
```js
const { RueDuCommerce } = require('./websites/rue-du-commerce');

const searchArray = [
  { articleName: '3080 RTX', search: '3080-rtx-10go' },
  { articleName: '3070 RTX', search: '3070-rtx-8go' },
];

const rueDuCommerce = new RueDuCommerce(searchArray);
```
**Try to be precise with the search's value**
