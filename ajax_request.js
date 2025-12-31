/* global bootbox */

/**
 * Default handler for ajax responses
 * @param response
 */
function defaultSuccessCallback(response) {
    switch (response.status) {
        case 200:
            location.reload();
            break;

        case 500:
            bootbox.alert({
                message: `<span style="color:Red;">${response.text}</span>`,
                size: 'small',
            });
            break;

        default:
            break;
    }
}

/**
 * Provide ajax requist hadlers
 * @param url
 * @param data
 * @param success
 * @param fail
 */
function ajaxRequest({ url, data }, success = defaultSuccessCallback, fail) {
    $.ajax({
        type: 'POST',
        url,
        data,
        success,
        fail,
    });
}

module.exports = ajaxRequest;
