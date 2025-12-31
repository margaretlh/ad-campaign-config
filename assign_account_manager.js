/**
 * Module to send post request for accouтt manager assignment
 */

/**
 * Sends post requist to assign account manager for user
 * @param username
 * @param profileId
 */
function assignAccountManager(username, profileId, isAccountManager) {
    if (profileId === '') return;

    const postData = {
        username,
        profile_id: profileId,
        is_account_manager: isAccountManager,
    };

    $.post('/admin/publisher/account_managers/assign/', $.param(postData), () => {
        window.location = `/admin/publisher/account_managers/?username=${username}`;
    });
}

/**
 * Bind button click to the post request send
 * @param username
 */
function init(username) {
    $('select#admin_profile').select2();
    $('.assign-manager-button').click(function () {
        const profileId = $('select#admin_profile').val();
        const isAccountManager = $('#account-manager').is(':checked');

        assignAccountManager(username, profileId, isAccountManager);
    });

}

module.exports = {
    init,
};
