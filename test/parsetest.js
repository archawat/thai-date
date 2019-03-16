const assert = require('chai').assert;
const thaidate = require('../src/index');
const currentYear4 = new Date().getFullYear().toString();
const currentYear2 = currentYear4.substring(2);

describe('date parser', function() {
    it('should return correct month', function() {        
        let dateRange = thaidate.getDateRanges('31-02 เม.ย 19')        
        assert.equal(dateRange.fromText, '2019-03-31');    
        assert.equal(dateRange.toText, '2019-04-02');
    });

    it('should convert eng', function() {
        // 25-27 APR 2019
        let dateRange = thaidate.getDateRanges('25-27 Apr 2019');
        assert.equal(dateRange.fromText, '2019-04-25');

        assert.equal(dateRange.toText, '2019-04-27');
    });

    it('should replace 21-24 พฤศจิกายน 19', function() {
        let dateRange = thaidate.getDateRanges('21-24 พฤศจิกายน 19');
        assert.equal(dateRange.fromText, '2019-11-21');

        assert.equal(dateRange.toText, '2019-11-24');
    })

    it('shoud convert 30 มี.ค 2019 - 1 Apr 2019', function(){
        let dateRange = thaidate.getDateRanges('30 มี.ค 2019 - 1 Apr 2019');
        assert.equal(dateRange.fromText, '2019-03-30');

        assert.equal(dateRange.toText, '2019-04-01');
    });

    it('shoud convert 26-28 พฤษภาคม 19', function(){
        let dateRange = thaidate.getDateRanges('26-28 พฤษภาคม 19');        
        assert.equal(dateRange.fromText, '2019-05-26');

        assert.equal(dateRange.toText, '2019-05-28');
    });

    it('shoud convert 30 มี.ค - 1 เม.ย 19', function(){
        let dateRange = thaidate.getDateRanges('30 มี.ค - 1 เม.ย 19');        
        assert.equal(dateRange.fromText, '2019-03-30');

        assert.equal(dateRange.toText, '2019-04-01');
    });    
  });  