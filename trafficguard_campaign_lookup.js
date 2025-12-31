/**
 * Redirect to campaign page
 */
function tgCampaignLookup() {
    const campaignId = prompt('Please enter TrafficGuard campaign ID', '');

    if (campaignId !== null) {
        window.location = `/admin/trafficguard/campaign/${campaignId}`;
    }
}

module.exports = {
    tgCampaignLookup,
};
