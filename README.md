# thai-date
## Convert Thai date range from String to Date
## แปลงวันที่ภาษาไทยแบบช่วงวันที่ จาก String ให้เป็น Date 
### Example / ตัวอย่าง
```
const thaidate = require('thai-date');

const range = thaidate.getDateRanges('23-3 พฤศจิกายน 2562');

console.log(range);

// output

{ 
  from: 2019-10-22T17:00:00.000Z,
  fromText: '2019-10-23',
  to: 2019-11-02T17:00:00.000Z,
  toText: '2019-11-03'
}

```
