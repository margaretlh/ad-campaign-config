/**
 * Provide base functional for web page
 */

/**
 * Initialize date pickers
 */
function init() {
    $('.input-daterange').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true
    });
}

module.exports = {
    init,
};
