# thai-date
## Convert date string to data type Date.
### Example
```
const thaidate = require('thai-date');

console.log(thaidate.getDateRanges('23-3 พฤศจิกายน 2562'));

// output

{ 
  from: 2019-10-22T17:00:00.000Z,
  fromText: '2019-10-23',
  to: 2019-11-02T17:00:00.000Z,
  toText: '2019-11-03'
}

```