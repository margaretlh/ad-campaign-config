/* global swal */

/**
 * Init for template
 */
function init() {
    $('#add-site-btn').click(e => {
        // reset inputs and open modal
        $('#addModifySite  input[name=name]').val('');
        $('#addModifySite  input[name=siteid]').val('');
        $('#addModifySite').modal('show');
    });

    $('.rename-site').click(e => {
        const siteId = $(e.target).data('siteid');
        const siteName = $(e.target).data('site-name');

        $('#addModifySite  input[name=name]').val(siteName);
        $('#addModifySite  input[name=siteid]').val(siteId);
        $('#addModifySite').modal('show');
    });

    $('.delete-site').click(e => {
        const siteId = $(e.target).data('siteid');
        const siteName = $(e.target).data('site-name');

        swal({
            title: 'Are you sure?',
            text: 'Do you really want to delete this site?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
        }).then(x => {
            $.get(`/sponsored_links/sites/delete/${siteId}/`, data => {
                if (data.status == 'success') {
                    swal(
                        'Deleted!',
                        'The site was successfully deleted',
                        'success',
                    ).then(() => {
                        location.reload();
                    });
                } else {
                    swal(
                        'Error!',
                        `It appears the site ${siteName} received traffic in the last ${data.day_range} days`,
                        'error',
                    )
                }
            });
        });
    });
}

module.exports = {
    init,
};
