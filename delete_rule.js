/* global swal */

/**
 * Initialize modal for rule deletion
 * @param data
 */
function init(data) {
    const { sharedTpa, username, tpaId, ruleId, path } = data;
    let url = null;

    if (sharedTpa === 'True') {
        url = `/admin/publisher/shared_revshare_rule/edit/?username=${username}&rule_id=${ruleId}&tpa_id=${tpaId}&delete=True`;
    } else if (path.includes('/publisher/bizdev')) {
        url = `/admin/publisher/bizdev_rule/edit/?username=${username}&rule_id=${ruleId}&delete=True`;
    } else {
        url = `/admin/publisher/revshare_rule/edit/?username=${username}&rule_id=${ruleId}&tpa_id=${tpaId}&delete=True`;
    }

    $('#delete-rule-btn').click(() => {
        swal({
            title: 'Are you sure?',
            text: 'Do you really want to delete this revshare rule?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
        }).then(() => {
            window.location.replace(url);
        });
    });
}

module.exports = {
    init,
};
