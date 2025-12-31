/* global swal */

/**
 * Initialize delete modal
 * @param tpaId
 * @param username
 */
function init(data) {
    const { tpaId, username } = data;

    $('#tpa_delete').click(() => {
        swal({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(() => {
            $.get(`/admin/publisher/tpa/delete/${tpaId}/`, () => {
                window.location = `/admin/publisher/tpa_list/?username=${username}`;
            });
        });
    });
}

module.exports = {
    init,
};
