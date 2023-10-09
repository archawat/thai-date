function getMonthThaiEng() {
    const monthWords = {
        Jan: ['มกราคม', 'มกรา', 'ม.ค.', 'ม.ค', 'มค'],
        Feb: ['กุมถาพันธ์', 'กุมภาพันธ์', 'กุมภา', 'ก.พ.', 'ก.พ', 'กพ'],
        Mar: ['มีนาคม', 'มีนา', 'มี.ค.', 'มี.ค', 'มีค'],
        Apr: ['เมษายน', 'เมษา', 'เม.ย.', 'เม.ย', 'เมย'],
        May: ['พฤษภาคม', 'พฤษภา', 'พ.ค.', 'พ.ค', 'พค'],
        Jun: ['มิถุนายน', 'มิถุนา', 'มิ.ย.', 'มิ.ย', 'มิย'],
        Jul: ['กรกฎาคม', 'กรกฏาคม', 'กรกฎา', 'กรกฏา', 'ก.ค.', 'ก.ค', 'กค'],
        Aug: ['สิงหาคม', 'สิงหา', 'ส.ค.', 'ส.ค', 'สค'],
        Sep: ['กันยายน', 'กันยา', 'ก.ย.', 'ก.ย', 'กย'],
        Oct: ['ตุลาคม', 'ตุลา', 'ต.ค.', 'ต.ค', 'ตค'],
        Nov: ['พฤศจิกายน', 'พฤศจิกา', 'พ.ย.', 'พ.ย', 'พย'],
        Dec: ['ธันวาคม', 'ธันวา', 'ธ.ค.', 'ธ.ค', 'ธค']
    };

    const result = {};
    for (const [eng, tha] of Object.entries(monthWords)) {
        tha.forEach(n => {
            result[n] = eng;
        });
    }
    return result;
}

function replaceMonthThaiToEng(val) {
    const monthMap = getMonthThaiEng();
    const allKeys = Object.keys(monthMap);
    allKeys.sort((a,b) => b.length - a.length);
    for (const key of allKeys) {
        const regex = new RegExp(key, 'g');
        val = val.replace(regex, monthMap[key]);
    }
    return val;
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
    // clean text after month replaced.
    dateFormat = dateFormat.replace(/[เ,ุ,ู,ิ,๊]/g, '');
    dateFormat = dateFormat.replace(/–/g,'-');

    // Check if only a month name is provided
    const monthOnlyMatch = dateFormat.match(/([A-z]+)/);
    const dayMatch = dateFormat.match(/^([1-9]{1,2})/);
    if (monthOnlyMatch && !dateFormat.includes('-')) {
        const monthFrom = monthOnlyMatch[1];
        const dayFrom = dayMatch ? dayMatch[1] : 1;
        const dayTo = new Date(new Date().getFullYear(), getMonth(monthFrom) + 1, 0).getDate();
        const yearFrom = new Date().getFullYear();
        const yearTo = new Date().getFullYear();
        return {
            from: new Date(yearFrom, getMonth(monthFrom), dayFrom),
            fromText: `${yearFrom}-${('0' + String(getMonth(monthFrom) + 1)).slice(-2)}-${('0' + dayFrom).slice(-2)}`,
            to: new Date(yearTo, getMonth(monthFrom), dayTo),
            toText: `${yearTo}-${('0' + String(getMonth(monthFrom) + 1)).slice(-2)}-${('0' + dayTo).slice(-2)}`
        };
    }

    const match = dateFormat.match(/([0-9]{1,2})\s{0,4}([A-z]*)?\s{0,4}([0-9]{2,4})?\s{0,4}-\s{0,4}([0-9]{1,2})\s{0,4}([A-z]*)\s{0,4}([0-9]{2,4})?/);
    if (!match) return null;

    let [_, dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo] = match;

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

    if (parseInt(dayFrom) > parseInt(dayTo) && parseInt(monthFrom) === parseInt(monthTo)) {
        monthFrom = parseInt(monthFrom) - 1;
    }

    let from = new Date(parseInt(yearFrom), parseInt(monthFrom), parseInt(dayFrom));
    let to = new Date(parseInt(yearTo), parseInt(monthTo), parseInt(dayTo));

    
    // if(!dateParsed[0].end) {
    //     throw 'error convert ' + val;
    // }
    // let dateTo = dateParsed[0].end.date();

    if(from > to && from.getFullYear() == to.getFullYear() && from.getMonth() == to.getMonth()){
        from.setMonth(from.getMonth() - 1);        
    }

    if(from > to){
        from.setFullYear(from.getFullYear() -1);
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
