/**
 * Enables quick dates picker in form with `start_date`  and `end_date`
 */

/* eslint-disable */
String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }

    return s;
};

const left_pad = function (input) {
    var str = input.toString();
    while (str.length < 2)
        str = '0' + str;
    return str;
};

const get_date = function (dt) {
    var day = left_pad(dt.getDate());
    var month = left_pad(dt.getMonth() + 1); //January is 0!
    var year = dt.getFullYear();
    var str_date = '{0}-{1}-{2}'.f(year, month, day);
    return str_date;
};

function first_day_previous_month() {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

function last_day_previous_month() {
    var date = new Date();
    date.setDate(1);
    date.setHours(-1);
    return date;
}

$('#id_quick_dates').change(function (e) {
    var dateRangeSelection = parseInt($('#id_quick_dates').val(), 10);
    var start = $('#id_start_date');
    var end = $('#id_end_date');
    var dateRangeStart;
    var dateRangeEnd;
    switch (dateRangeSelection) {
        case 1: // today
            var dt = new Date();
            var str_date = get_date(dt);
            dateRangeStart = str_date;
            dateRangeEnd = str_date;
            break;
        case 2: // yesterday
            var today = new Date();
            var dt = new Date(today);
            dt.setDate(today.getDate() - 1);
            var str_date = get_date(dt);
            dateRangeStart = str_date;
            dateRangeEnd = str_date;
            break;
        case 3: // last 7 days
            var today = new Date();
            var dt = new Date(today);
            dt.setDate(today.getDate() - 7);
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            dateRangeStart = get_date(dt);
            dateRangeEnd = get_date(yesterday);
            break;
        case 4: // last 14 days
            var today = new Date();
            var dt = new Date(today);
            dt.setDate(today.getDate() - 14);
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            dateRangeStart = get_date(dt);
            dateRangeEnd = get_date(yesterday);
            break;
        case 5: // last 30 days
            var today = new Date();
            var dt = new Date(today);
            dt.setDate(today.getDate() - 30);
            var yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            dateRangeStart = get_date(dt);
            dateRangeEnd = get_date(yesterday);
            break;
        case 6: // this month
            var today = new Date();
            var dt = new Date();
            dt.setDate(1);
            dateRangeStart = get_date(dt);
            dateRangeEnd = get_date(today);
            break;
        case 7: // last month
            dateRangeStart = get_date(first_day_previous_month());
            dateRangeEnd = get_date(last_day_previous_month());
            break;
        case 8: // year to date
            var start_date = new Date(new Date().getFullYear(), 0, 1);
            var end_date = new Date();
            dateRangeStart = get_date(start_date);
            dateRangeEnd = get_date(end_date);
            break;
        default:
            dateRangeStart = start.datepicker('getDate');
            dateRangeEnd = end.datepicker('getDate');
    }
    start.datepicker('setDate', dateRangeStart);
    end.datepicker('setDate', dateRangeEnd);
});

$('#previous_date,#next_date').click((event) => {

    let direction = event.target.innerHTML
    var start = $('#id_start_date');
    var end = $('#id_end_date');
    var startDate = $('#id_start_date').val();
    var date = new Date(startDate)

    let adjustedDate;
    let adjustedString;

    if (direction === 'Prev') {
        adjustedDate = date.setDate(date.getDate() - 1)
        adjustedString = new Date(adjustedDate).toISOString().split('T')[0]
    } else {
        adjustedDate = date.setDate(date.getDate() + 1)
        adjustedString = new Date(adjustedDate).toISOString().split('T')[0]
    }

    start.val(adjustedString);
    end.val(adjustedString);

})

$('#id_start_date,#id_end_date').change((event) => {

    const startValue = $('#id_start_date').val()
    const endValue = $('#id_end_date').val()

    if (startValue !== endValue) {
        $('#previous_date,#next_date').css("visibility", "hidden")
    } else {
        $('#previous_date,#next_date').css("visibility", "visible")
    }

})

$('#id_quick_dates').change((event) => {

    const value = $('#id_quick_dates :selected').text()
    const sameDates = ["---", "Today", "Yesterday"]

    if (!sameDates.includes(value)) {
        $('#previous_date,#next_date').css("visibility", "hidden")
    } else {
        $('#previous_date,#next_date').css("visibility", "visible")
    }

})

/* eslint-enable */
