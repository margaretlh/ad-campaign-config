const ajaxRequest = require('./ajax_request');

/**
 * Init ajax on modal
 */
function init() {
    $('#createButton').click(e => {
        e.preventDefault();

        ajaxRequest({
            url: '/admin/publishers/create',
            data: $('#createForm').serialize(),
        });
    });

    // reset form when closed
    $('#myModal').on('hidden.bs.modal', () => {
        $('#createForm')[0].reset();
    });
}

module.exports = {
    init,
};
