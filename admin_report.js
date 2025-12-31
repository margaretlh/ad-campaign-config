const dateFormat = 'yy-mm-dd';

/**
 * Init datepickers and download url
 * @param data
 */
function init(data) {
    const { startDate, endDate } = data;

    $('#id_start_date')
        .datepicker({ dateFormat })
        .val(startDate)
        .attr('autocomplete', 'off');
    $('#id_end_date')
        .datepicker({ dateFormat })
        .val(endDate)
        .attr('autocomplete', 'off');

    $('.dropdown-toggle').toggle.on('contextmenu', e => {
        e.preventDefault();
        e.target.dropdown('toggle');
    });

    const separator = window.location.href.indexOf('?') === -1 ? '?' : '&';
    const downloadUrl = `${window.location.href}${separator}download=csv`;

    $('#csvDownload').attr('href', downloadUrl);
}

module.exports = {
    init,
};
