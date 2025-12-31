const moment = require('moment');
const date = moment();
const defaultDates = {
    'first_period': {
        'start': date.clone().subtract(8, 'days'),
        'end': date.clone().subtract(5, 'days')
    },
    'second_period': {
        'start': date.clone().subtract(4, 'days'),
        'end': date.clone().subtract(1, 'days'),
    }
}

function setDefaultDates() {
    $('#first_period_start_date').datepicker('update', defaultDates.first_period.start.format('Y-MM-D'));
    $('#first_period_end_date').datepicker('update', defaultDates.first_period.end.format('Y-MM-D'));
    $('#second_period_start_date').datepicker('update', defaultDates.second_period.start.format('Y-MM-D'));
    $('#second_period_end_date').datepicker('update', defaultDates.second_period.end.format('Y-MM-D'));
}

function disableField(el) {
    el.attr('disabled', true);
    el.addClass('disabled');
}
function enableField(el) {
    el.removeAttr('disabled');
    el.removeClass('disabled');
}


function calcFirstPeriod() {
    let second_period_start_date = moment($(`#second_period_start_date`).datepicker('getDate'));
    let second_period_end_date = moment($(`#second_period_end_date`).datepicker('getDate'));
    let period_days_diff = (second_period_end_date - second_period_start_date) / 1000 / 60 / 60 / 24;
    let first_period_end_date = second_period_start_date.clone().subtract(1, 'days');
    let first_period_start_date = first_period_end_date.clone().subtract(period_days_diff, 'days');
    $(`#first_period_start_date`).datepicker('update', first_period_start_date.format('Y-MM-D'));
    $(`#first_period_end_date`).datepicker('update', first_period_end_date.format('Y-MM-D'));
}
function calcSecondPeriod() {
    let first_period_start_date = moment($(`#first_period_start_date`).datepicker('getDate'));
    let first_period_end_date = moment($(`#first_period_end_date`).datepicker('getDate'));
    let period_days_diff = (first_period_end_date - first_period_start_date) / 1000 / 60 / 60 / 24;
    let second_period_start_date = first_period_end_date.clone().add(1, 'days');
    let second_period_end_date = second_period_start_date.clone().add(period_days_diff, 'days');
    $(`#second_period_start_date`).datepicker('update', second_period_start_date.format('Y-MM-D'));
    $(`#second_period_end_date`).datepicker('update', second_period_end_date.format('Y-MM-D'));
}

function init() {
    InitDatePicker.init('.input-daterange', {
        format: 'yyyy-mm-dd',
    });
    $('select#user').select2();
    $('select#campaign').select2();
    $('select#publishers').select2();


    $('#calc_difference').change(function () {
        if (this.checked) {
            $('#calc_difference_panel_body').show();
            $('#auto_first_period').prop('checked', true);
            $('#auto_second_period').prop('checked', true);
            $('#first_period_dates').hide()
            $('#second_period_dates').hide()
            $('#period_length_group').show()
        }
        else {

            $('#calc_difference_panel_body').hide();
            $('#first_period_start_date').datepicker('update', '');
            $('#first_period_end_date').datepicker('update', '');
            $('#second_period_start_date').datepicker('update', '');
            $('#second_period_end_date').datepicker('update', '');
        }
    });

    $('#auto_first_period').change(function () {
        if (this.checked) {
            disableField($('#first_period_start_date'));
            disableField($('#first_period_end_date'));
            if ($('#auto_second_period')[0].checked) {
                $('#first_period_dates').hide()
                $('#second_period_dates').hide()
                $('#period_length_group').show()
            }
            else {
                calcFirstPeriod();
            }
        }
        else {
            if ($('#auto_second_period')[0].checked) {
                setDefaultDates();
                disableField($('#second_period_start_date'));
                disableField($('#second_period_end_date'));
            }
            $('#first_period_dates').show()
            $('#second_period_dates').show()
            $('#period_length_group').hide()
            enableField($('#first_period_start_date'));
            enableField($('#first_period_end_date'));
        }
    });
    $('#auto_second_period').change(function () {
        if (this.checked) {
            disableField($('#second_period_start_date'));
            disableField($('#second_period_end_date'));
            if ($('#auto_first_period')[0].checked) {
                $('#first_period_dates').hide()
                $('#second_period_dates').hide()
                $('#period_length_group').show()
            }
            else {
                calcSecondPeriod();
            }
        }
        else {
            if ($('#auto_first_period')[0].checked) {
                setDefaultDates();
                disableField($('#first_period_start_date'));
                disableField($('#first_period_end_date'));
            }
            $('#first_period_dates').show()
            $('#second_period_dates').show()
            $('#period_length_group').hide()
            enableField($('#second_period_start_date'));
            enableField($('#second_period_end_date'));
        }
    });

    $('#first_period_dates input').datepicker().on('changeDate', function (event) {
        if ($('#auto_second_period')[0].checked) {
            calcSecondPeriod();
        }
    });

    $('#second_period_dates input').datepicker().on('changeDate', function (event) {
        if ($('#auto_first_period')[0].checked) {
            calcFirstPeriod();
        }
    });

    $('form').submit(function () {
        if (![
            $('#auto_first_period')[0].checked,
            $('#auto_second_period')[0].checked
        ].every(v => v === true)) {
            $('#first_period_start_date').removeAttr('disabled')
            $('#first_period_end_date').removeAttr('disabled')
            $('#second_period_start_date').removeAttr('disabled')
            $('#second_period_end_date').removeAttr('disabled')
        }
    })
}

module.exports = {
    init,
};
