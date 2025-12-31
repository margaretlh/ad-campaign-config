/**
 * Initialize template
 * @param data
 */
function init(data) {
    const { startTime, endTime } = data;

    $('#id_start_date').val(startTime).attr('autocomplete', 'off');
    $('#id_end_date').val(endTime).attr('autocomplete', 'off');

    const toggle = $('.dropdown-toggle');

    toggle.on('contextmenu', e => {
        e.preventDefault();
        toggle.dropdown('toggle');
    });
}

module.exports = {
    init,
};
