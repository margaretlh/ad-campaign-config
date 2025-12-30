import axios from 'axios'
import qs from 'qs'

export default {
    loadDiagnostics: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-diagnostics/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadRawClicks: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-raw-clicks/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadPivotReport: (payload, success, failure) => axios.get(
        `/admin/trafficguard/campaign/${payload.params.campaign_id}/pivot/load/`,
        payload
    ).then(success).catch(failure),

    loadCountryOverview: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-country-overview/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadRevenueProviderOverview: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-revenue-provider-overview/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadDeviceOverview: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-device-overview/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadCostProvidersOverview: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-cost-providers-overview/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadTrafficOverview: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-traffic-overview/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadDailyRevenueSummary: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-daily-revenue-summary/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadCampaignNotesPartial: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/notes-partial/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadCampaignNotes: (campaign_id, success, failure) => axios.get(`/admin/trafficguard/campaign/${campaign_id}/load-campaign-notes/`)
        .then(success).catch(failure),

    loadAssignedCostReports: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-assigned-cost-reports/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadClickHashReport: (payload, success, failure) => axios.get(`/admin/trafficguard/load/campaign/${payload.campaign_id}/${payload.detail}/`, {
        params: payload.params
    }).then(success).catch(failure),

    updateCampaignSettings: (payload, success, failure) => axios.post(`/admin/trafficguard/campaign/${payload.campaign_id}/update-settings/`, payload.payload).then(success).catch(failure),

    loadCostDetailReports: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-cost-detail-reports/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadMultiKeyReport: (payload, success, failure) => {
        return axios.get(
            `/admin/trafficguard/campaign/report/load-multi-key/${payload.campaign_id}/`,
            {
                params: payload.params,
                paramsSerializer: params => {
                    return qs.stringify(params, { indices: false })
                }
            },
        ).then(success).catch(failure)
    },

    loadSerpKeywords: (campaignId, success, failure) => axios.get(`/admin/trafficguard/campaign/${campaignId}/load-serp-kws/`).then(success).catch(failure),

    updateSerpRedirectionRule: (payload, success, failure) => axios.post(`/admin/trafficguard/campaign/${payload.campaign_id}/update-serp-kws/`, payload).then(success).catch(failure),

    loadDynamicLander: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-dynamic-lander/`, {
        params: payload.params
    }).then(success).catch(failure),

    loadNotifications: (campaign_id, success, failure) => axios.get(`/admin/trafficguard/campaign/${campaign_id}/load-notifications/`)
        .then(success).catch(failure),

    loadNotificationRules: (campaign_id, success, failure) => axios.get(`/admin/trafficguard/campaign/${campaign_id}/load-notification-rules/`)
        .then(success).catch(failure),

    loadTrafficSourceUrls: (campaign_id, showNakedLinks, success, failure) => axios.get(`/admin/trafficguard/campaign/${campaign_id}/load-traffic-source-urls?naked-links=${showNakedLinks}`)
        .then(success).catch(failure),

    loadLanderKws: (campaign_id, success, failure) => axios.get(`/admin/trafficguard/campaign/${campaign_id}/load-lander-kws/`)
        .then(success).catch(failure),

    loadCostSearch: (query, success, failure) => axios.get(
        `/admin/trafficguard/campaign/tpclink/search/`,
        { params: query }
    ).then(success).catch(failure),

    loadCostAutoComplete: (query, success, failure) => axios.get(
        `/admin/trafficguard/campaign/tpclink/autocomplete/`,
        { params: query }
    ).then(success).catch(failure),

    updateLanderKeywods: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaign_id}/update-lander-kws/`,
        payload
    ).then(success).catch(failure),

    associateCost: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaign_id}/assign-cost-detail-report/`,
        payload
    ).then(success).catch(failure),

    unassociateAndRemoveCost: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/tpclink/remove/${payload}/?unassociate=on`,
        {}
    ).then(success).catch(failure),

    removeCost: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/tpclink/remove/${payload}/`,
        {}
    ).then(success).catch(failure),

    loadSponsoredLinksInfo: (payload, success, failure) => axios.get(
        `/admin/trafficguard/campaign/${payload.campaign_id}/load-sl-info/`,
        { params: payload.params }
    ).then(success).catch(failure),

    loadTotalRevenueOverview: (payload, success, failure) => axios.get(
        `/admin/trafficguard/campaign/${payload.campaign_id}/load-total-revenue-overview/`,
        { params: payload.params }
    ).then(success).catch(failure),

    updateCampaignNote: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaign_id}/update-campaign-note/`,
        payload.note
    ).then(success).catch(failure),

    deleteNote: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaign_id}/delete-campaign-note/`,
        payload.note
    ).then(success).catch(failure),

    verifyFacebookDomain: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaign_id}/verify-facebook-domain/`,
        payload.verification
    ).then(success).catch(failure),

    loadKpiPerformanceReport: (payload, success, failure) => axios.get(
        `/admin/trafficguard/load-kpi-performance-report/${payload.userId}/`,
        { params: payload.filters }
    ).then(success).catch(failure),

    loadKpiCampaigns: (payload, success, failure) => axios.get(
        `/admin/trafficguard/load-kpi-campaigns/`,
      { params: payload }
    ).then(success).catch(failure),

    deleteNotificationRule: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaign_id}/notification-rule/${payload.notification_rule_id}/delete/`,
        {}
    ).then(success).catch(failure),

    updateNotificationRule: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaign_id}/notification-rule/${payload.notification_rule_id}/`,
        payload
    ).then(success).catch(failure),

    loadNotificationRuleChoices: (campaignId, success, failure) => axios.get(
        `/admin/trafficguard/campaign/${campaignId}/load-notification-rule-choices/`,
    ).then(success).catch(failure),

    loadRevenueDomains: (payload, success, failure) => axios.get(`/admin/trafficguard/campaign/${payload.campaign_id}/load-revenue-domains/`, {
        params: payload.params
    }).then(success).catch(failure),

    enableImprinting: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaignId}/enable-imprinting/`,
        payload
    ).then(success).catch(failure),

    disableImprinting: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaignId}/disable-imprinting/`,
        payload
    ).then(success).catch(failure),

    // New Users
    newUsersIndex: (success, failure) => axios.get(
        `/admin/new_users/load-new-users-index/`,
    ).then(success).catch(failure),

    loadNewUserProfile: (payload, success, failure) => axios.get(
        `/admin/new_users/load-new-user/${payload.userId}/`,
        payload
    ).then(success).catch(failure),

    approveNewUserProfile: (payload, success, failure) => axios.post(
        `/admin/new_users/approve-new-user/${payload.userId}/`,
        payload
    ).then(success).catch(failure),

    denyNewUserProfile: (payload, success, failure) => axios.post(
        `/admin/new_users/deny-new-user/${payload.userId}/`,
        payload
    ).then(success).catch(failure),

    //BizDev
    bizDevIndex: (success, failure) => axios.get(
        `/admin/publisher/bizdev/load-bizdev-index/`,
    ).then(success).catch(failure),

    createBizDevProfile: (payload, success, failure) => axios.post(
        `/admin/publisher/bizdev/bizdev-create/`,
        payload
    ).then(success).catch(failure),

    // Campaign Revenue Share
    createCampaignRevenueShareRule: (payload, success, failure) => axios.post(
        `/admin/trafficguard/campaign/${payload.campaignId}/revenue-share-rule/`,
        payload
    ).then(success).catch(failure),

    loadCampaignRevenueShareSummary: (payload, success, failure) => axios.get(
        `/admin/trafficguard/campaign/${payload.campaignId}/revenue-share-summary/`,
        { params: payload.params }
    ).then(success).catch(failure),
    // User Campaigns Per Day
    loadCampaignPerDayIndex: (payload, success, failure) => axios.get(
      `/admin/trafficguard/load-user-campaign-per-day/${payload.userId}/`,
      { params: payload.filters }
    ).then(success).catch(failure),
    // User Campaigns Per Month
    loadCampaignMonthlyIndex: (payload, success, failure) => axios.get(
      `/admin/trafficguard/load-user-campaign-per-month/${payload.userId}/`,
      { params: payload.filters }
    ).then(success).catch(failure),

    deleteCampaignRevenueShareRule: (payload, success, failure) => axios.delete(
      `/admin/trafficguard/campaign/${payload.campaignId}/revenue-share-rule/${payload.ruleId}/delete/`,
    ).then(success).catch(failure),
    
    loadCampaignChangeLog: (campaignId, success, failure) => axios.get(
        `/admin/trafficguard/campaign/${campaignId}/load-change-log/`,
    ).then(success).catch(failure),
    
    // Taboola Keyword API
    loadTaboolaKeywordReport: (payload, success, failure) => axios.get(
      `/admin/load-taboola-kw-report/`,
      { params: payload.filters }
    ).then(success).catch(failure)
}
