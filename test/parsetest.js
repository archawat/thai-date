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

    it('should convert 21-24 พฤศจิกายน 19', function() {
        let dateRange = thaidate.getDateRanges('21-24 พฤศจิกายน 19');
        assert.equal(dateRange.fromText, '2019-11-21');

        assert.equal(dateRange.toText, '2019-11-24');
    })

    it('should convert 30 มี.ค 2019 - 1 Apr 2019', function(){
        let dateRange = thaidate.getDateRanges('30 มี.ค 2019 - 1 Apr 2019');
        assert.equal(dateRange.fromText, '2019-03-30');

        assert.equal(dateRange.toText, '2019-04-01');
    });

    it('should convert 26-28 พฤษภาคม 19', function(){
        let dateRange = thaidate.getDateRanges('26-28 พฤษภาคม 19');        
        assert.equal(dateRange.fromText, '2019-05-26');

        assert.equal(dateRange.toText, '2019-05-28');
    });

    it('should convert 30 มี.ค - 1 เม.ย 19', function(){
        let dateRange = thaidate.getDateRanges('30 มี.ค - 1 เม.ย 19');        
        assert.equal(dateRange.fromText, '2019-03-30');

        assert.equal(dateRange.toText, '2019-04-01');
    });
    it('should convert 30 - 1 เม.ย next year', function(){
        let dateRange = thaidate.getDateRanges('30 - 1 เม.ย ' + (parseInt(currentYear4) + 1));        
        assert.equal(dateRange.fromText, String(parseInt(currentYear4) + 1) + '-03-30');

        assert.equal(dateRange.toText, String(parseInt(currentYear4) + 1) + '-04-01');
    });
    it('should convert 30 พ.ค. -  1 มิ.ย. 19', function(){
        let dateRange = thaidate.getDateRanges('30 พ.ค. -  1 มิ.ย. 19');        
        assert.equal(dateRange.fromText, '2019-05-30');

        assert.equal(dateRange.toText, '2019-06-01');
    }); 
    it('should convert 08-10  มีนาคม 62', function(){
        let dateRange = thaidate.getDateRanges('08-10  มีนาคม 62');        
        assert.equal(dateRange.fromText, '2019-03-08');

        assert.equal(dateRange.toText, '2019-03-10');
    });
    it('should convert 30 ธ.ค - 1 ม.ค 20xxxxxxxxxx', function(){
        let dateRange = thaidate.getDateRanges('30 ธ.ค - 1 ม.ค 20xxxxxxxxxx');        
        assert.equal(dateRange.fromText, '2019-12-30');

        assert.equal(dateRange.toText, '2020-01-01');
    });
    it('should convert 30 ธ.ค - 2 ม.ค 2563', function(){
        let dateRange = thaidate.getDateRanges('30 ธ.ค - 2 ม.ค 2563');        
        assert.equal(dateRange.fromText, '2019-12-30');

        assert.equal(dateRange.toText, '2020-01-02');
    });
    it('should convert no end year', function(){
        let dateRange = thaidate.getDateRanges('20 Dec - 31 Dec');        
        assert.equal(dateRange.fromText, `${currentYear4}-12-20`);

        assert.equal(dateRange.toText, `${currentYear4}-12-31`);
    });

    
  });  