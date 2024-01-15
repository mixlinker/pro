function getDateTime(value, type) {
    let start = '';
    let end = '';
    let gaps = '';
    let now = new Date();
    let YY = now.getFullYear();
    let MM = now.getMonth() + 1;
    let DD = now.getDate();
    let HH = now.getHours();
    let mm = now.getMinutes();
    let ss = now.getSeconds();
    const nowTimeStr = now.getTime();
    switch (type) {
        case 'lastMonth':
            if (now.getMonth() === 0) {
                MM = 13 - value;
                YY = YY - 1;
            } else {
                MM = MM - value;
            }
            var endStr = new Date(YY + '/' + zero(MM) + '/' + zero(DD) + ' ' + zero(HH) + ':' + zero(mm) + ':' + zero(ss)).getTime();
            end = formatDate(endStr);
            startStr = new Date(YY + '/' + zero(MM) + "/01").getTime();
            start = formatDate(startStr);
            break;
        case 'hour':
            var startStr = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ":00:00").getTime();
            start = formatDate(startStr);
            end = zero(YY) + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ':' + zero(mm) + ':' + zero(ss);
            break;
        case 'day':
            var startStr = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + "00:00:00").getTime();
            start = formatDate(startStr);
            end = zero(YY) + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ':' + zero(mm) + ':' + zero(ss);
            break;
        case 'week':
            var nowWeek = now.getDay() + 1;
            gaps = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + "00:00:00").getTime() - 60 * 60 * 1000 * value * 24 * nowWeek;
            start = formatDate(gaps);
            end = zero(YY) + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ':' + zero(mm) + ':' + zero(ss);
            break;
        case 'month':
            var startStr = '';
            if (MM - value > 0) {
                startStr = new Date(YY + '/' + zero(MM - value + 1) + "/01").getTime();
            } else {
                startStr = new Date(YY - 1 + '/' + zero(MM - value + 12) + "/01").getTime();
            }
            start = formatDate(startStr);
            end = new Date(zero(YY) + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ':' + zero(mm) + ':' + zero(ss)).getTime();
            end = formatDate(end)
            break;
        case 'year':
            var startStr = new Date(YY - value + 1 + "/01/01").getTime();
            start = formatDate(startStr);
            end = zero(YY) + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ':' + zero(mm) + ':' + zero(ss);
            break;
        case 'last-hour':
            var endStr = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ":00:00").getTime();
            end = formatDate(endStr);
            var startStr = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ":00:00").getTime() - 60 * 60 * value * 1000;
            start = formatDate(startStr);
            break;
        case 'last-day':
            var endStr = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + "00:00:00").getTime()
            end = formatDate(endStr);
            var startStr = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + "00:00:00").getTime() - 60 * 60 * value * 1000 * 24;
            start = formatDate(startStr);
            break;
        case 'last-week':
            var nowWeek = now.getDay() + 1;
            gaps = new Date(YY + '-' + zero(MM) + '-' + zero(DD) + ' ' + "00:00:00").getTime() - 60 * 60 * 1000 * value * 24 * nowWeek;
            end = formatDate(gaps);
            start = formatDate(gaps - 7 * 24 * 60 * 60 * 1000 * value);
            break;
        case 'last-month':
            var endStr = new Date(YY + '/' + zero(MM) + "/01").getTime();
            end = formatDate(endStr);
            if (MM - value > 0) {
                startStr = new Date(YY + '/' + zero(MM - value) + "/01").getTime();
            } else {
                startStr = new Date(YY - 1 + '/' + zero(MM - value + 12) + "/01").getTime();
            }
            start = formatDate(startStr);
            break;
        case 'last-year':
            var endStr = new Date(YY + "/01/01").getTime();
            end = formatDate(endStr);
            startStr = new Date(YY - value + "/01/01").getTime();
            start = formatDate(startStr)
            break;
    }
    return {
        start: start,
        end: end
    };
};

function zero(param) {
    return param > 9 ? param : '0' + param;
}

function formatDate(date) {
    const YY = new Date(date).getFullYear();
    const MM = new Date(date).getMonth() + 1;
    const DD = new Date(date).getDate();
    const HH = new Date(date).getHours();
    const mm = new Date(date).getMinutes();
    const ss = new Date(date).getSeconds();

    return zero(YY) + '-' + zero(MM) + '-' + zero(DD) + ' ' + zero(HH) + ':' + zero(mm) + ':' + zero(ss);
}

export {
    getDateTime
}