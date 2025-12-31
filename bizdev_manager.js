/* global bootbox */

/**
 * Init ajax requset for bizdev creation
 */
function init() {
    $('#saveButton').click(e => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/admin/bizdev/profile/create',
            data: $('#createForm').serialize(),
            success: response => {
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
            },
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
