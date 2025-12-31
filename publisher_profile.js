const ajaxRequest = require('./ajax_request');

/**
 * Init publisher profile
 * @param data
 */
function init(data) {
    const { username } = data;

    $('#saveProfile').click(e => {
        e.preventDefault();

        ajaxRequest({
            url: `/admin/publishers/profile/edit/${username}`,
            data: $('#editProfile').serialize(),
        });
    });

    $('#createTpaForm').submit(e => {
        e.preventDefault();

        const myForm = $('#createTpaForm');

        myForm
            .find(':input:disabled')
            .removeAttr('disabled')
            .attr('disabled', 'disabled');

        ajaxRequest({
            url: '/admin/tpa/create',
            data: myForm.serialize(),
        });
    });

    // reset form when closed
    $('#createTpaModal').on('hidden.bs.modal', () => {
        $('#createTpaForm')[0].reset();
    });
}

module.exports = {
    init,
};
