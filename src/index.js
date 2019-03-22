function replaceMonthThaiToEng(val) {   
    return val
             .replace(/\มกราคม/g,"Jan").replace(/\มกรา/g,"Jan")
             .replace(/\กุมภาพันธ์/g,"Feb").replace(/\กุมภา/g,"Feb")
             .replace(/\มีนาคม/g,"Mar").replace(/\มีนา/g,"Mar")
             .replace(/\เมษายน/g,"Apr").replace(/เมษา/g, "Apr")
             .replace(/\พฤษภาคม/g,"May").replace(/\พฤษภา/g,"May")
             .replace(/\มิถุนายน/g,"Jun").replace(/\มิถุนา/g,"Jun")
             .replace(/\กรกฎาคม/g,"Jul").replace(/\กรกฏาคม/g,"Jul")
             .replace(/\กรกฎา/g,"Jul").replace(/\กรกฏา/g,"Jul")
             .replace(/\สิงหาคม/g, "Aug").replace(/\สิงหา/g, "Aug")
             .replace(/\กันยายน/g, "Sep").replace(/\กันยา/g, "Sep")
             .replace(/\ตุลาคม/g,"Oct").replace(/\ตุลา/g,"Oct")
             .replace(/\พฤศจิกายน/g, "Nov").replace(/\พฤศจิกา/g, "Nov")
             .replace(/\ธันวาคม/g, "Dec").replace(/\ธันวา/g, "Dec")
             .replace(/\ม.ค./g,"Jan").replace(/\ก.พ./g,"Feb").replace(/\มี.ค./g,"Mar")
             .replace(/\เม.ย./g,"Apr").replace(/\พ.ค./g,"May").replace(/\มิ.ย./g,"Jun")
             .replace(/\ก.ค./g,"Jul").replace(/\ส.ค./g, "Aug").replace(/\ก.ย./g, "Sep")
             .replace(/\ต.ค./g,"Oct").replace(/\พ.ย./g, "Nov").replace(/\พ.ย/g, "Nov")
             .replace(/\ม.ค/g,"Jan").replace(/\ก.พ/g,"Feb").replace(/\มี.ค/g,"Mar")
             .replace(/\เม.ย/g,"Apr").replace(/\พ.ค/g,"May").replace(/\มิ.ย/g,"Jun")
             .replace(/\ก.ค/g,"Jul").replace(/\ส.ค/g, "Aug").replace(/\ก.ย/g, "Sep")
             .replace(/\ต.ค/g,"Oct").replace(/\ธ.ค./g, "Dec").replace(/\ธ.ค/g, "Dec")
             .replace(/\มค/g,"Jan").replace(/\กพ/g,"Feb").replace(/\มีค/g,"Mar")
             .replace(/\เมย/g,"Apr").replace(/\พค/g,"May").replace(/\มิย/g,"Jun")
             .replace(/\กค/g,"Jul").replace(/\สค/g, "Aug").replace(/\กย/g, "Sep")
             .replace(/\ตค/g,"Oct").replace(/\พย/g, "Nov").replace(/\ธค/g, "Dec");
 }

function replaceThaiYear(val){
    if (String(val).length === 2) {
        // if thai year, replace to en
        if (val >= 62)
            val = (2500 + parseInt(val) - 543);
        else
            val = 2000 + parseInt(val);
    } else if (String(val).length === 4) {
        if (parseInt(val) >= 2562) {
            val = parseInt(val) - 543;
        }
    }
    return val;
}

function getDateRanges(val){
    let dateFormat = replaceMonthThaiToEng(val);
    const match = dateFormat.match(/^([0-9]{1,2})\s{0,4}([A-z]*)?\s{0,4}([0-9]{2,4})?\s{0,4}-\s{0,4}([0-9]{1,2})\s{0,4}([A-z]*)\s{0,4}([0-9]{2,4})/);
    if (!match)
    {
        return null;
    }

    let dayFrom = match[1];
    let monthFrom = match[2];
    let yearFrom = match[3];
    let dayTo = match[4];
    let monthTo = match[5];
    let yearTo = match[6];
    // start check format year To and convert to yyyy
    if (!yearTo) {
        yearTo = new Date().getFullYear();
    }

    yearTo = replaceThaiYear(yearTo);
    // finished year to

    // start check start month
    if (!monthFrom) {
        monthFrom = getMonth(monthTo);
    } else{
        monthFrom = getMonth(monthFrom);
    }
    // finished start month

    monthTo = getMonth(match[5]);



    // start check start year
    if (yearFrom) {
        yearFrom = replaceThaiYear(yearFrom);
    } else {
        // if no start year
        yearFrom = yearTo;
    }
    // finish check start year

    if (isNaN(dayFrom)){
        throw 'Could not get dayFrom';
    }
    if (isNaN(monthFrom)){
        throw 'Could not get monthFrom';
    }
    if (isNaN(yearFrom)){
        throw 'Could not get yearFrom';
    }
    if (isNaN(dayTo)){
        throw 'Could not get dayTo';
    }
    if (isNaN(monthTo)){
        throw 'Could not get monthTo';
    }
    if (isNaN(yearTo)){
        throw 'Could not get yearTo';
    }

    //    

    let from = new Date(parseInt(yearFrom), parseInt(monthFrom), parseInt(dayFrom));
    let to = new Date(parseInt(yearTo), parseInt(monthTo), parseInt(dayTo));
    // if(!dateParsed[0].end) {
    //     throw 'error convert ' + val;
    // }
    // let dateTo = dateParsed[0].end.date();
    if(from > to && from.getUTCFullYear() == to.getUTCFullYear()){
        from.setUTCMonth(from.getUTCMonth() - 1);        
    }

    if(from > to){
        from.setUTCFullYear(from.getUTCFullYear() -1);
    }

    return {
        from,
        fromText: `${from.getFullYear()}-${('0' + String(from.getMonth() + 1)).slice(-2)}-${('0' + from.getDate()).slice(-2)}`,
        to,
        toText: `${to.getFullYear()}-${('0' + String(to.getMonth() + 1)).slice(-2)}-${('0' + to.getDate()).slice(-2)}`,
    };
    
}

/**
 * 
 * @param {string} strMonth 
 * @returns {number} Same as Date.getMonth()
 */
function getMonth(strMonth){
    let d = new Date(`${new Date().getFullYear()} ${strMonth} 01`);
    return d.getMonth();
}

module.exports = {
    replaceMonthThaiToEng,
    getDateRanges,
    getMonth,
}
