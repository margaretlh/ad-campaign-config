/**
 * Module for datepicker initialization
 */

/**
 * Provide shortcut for datepicker initialization
 * @param selector - elements selector to be turned into datepicker
 * @param config - additional configuration to be passed for datepicker
 */
function init(selector, config) {
    const datepickerConfig = config || {};

    $(selector).datepicker(datepickerConfig);
}

module.exports = {
    init,
};
