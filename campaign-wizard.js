import axios from 'axios'

export default {
    loadCampaignWizardMeta: (success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/builder-meta/'
    ).then(success).catch(failure),

    loadRegistrars: (success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/registrars/'
    ).then(success).catch(failure),

    loadCampaignWizardPublisherMeta: (params, success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/publisher-meta/',
        { params }
    ).then(success).catch(failure),

    verifyAdminMeta: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/verify-admin-meta/',
        payload
    ).then(success).catch(failure),

    checkDomainAvailability: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/domain-lookup/',
        payload
    ).then(success).catch(failure),

    verifyMonetization: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/verify-monetization/',
        payload
    ).then(success).catch(failure),

    createCategory: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/create-category/',
        payload
    ).then(success).catch(failure),

    createCampaign: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/create-campaign/',
        payload
    ).then(success).catch(failure),

    loadPublisherCampaigns: (publisher_id, success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/publisher/campaigns/',
        {
            params: {
                publisher_id
            }
        }
    ).then(success).catch(failure),

    loadCampaignKeywords: (campaign_id, success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/publisher/campaign-keywords/',
        {
            params: {
                campaign_id
            }
        }
    ).then(success).catch(failure),

    loadCampaignRequest: (campaign_request_id, success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/load-campaign-request/',
        {
            params: {
                campaign_request_id
            }
        }
    ).then(success).catch(failure),

    loadCampaignClone: (campaign_id, success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/load-campaign-clone/',
        {
            params: {
                campaign_id
            }
        }
    ).then(success).catch(failure),

    verifyKeywordListName: (keyword_list_name, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/verify-keyword-list-name/',
        {
            keyword_list_name
        }
    ).then(success).catch(failure),
    
    lookupCategory: (category, success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/lookup-category/',
        {
            params: {
                category
            }
        }
    ).then(success).catch(failure),
    
    loadDomainSuggestions: (payload, success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/lookup-domain-suggestions/',
        {
            params: {
                domain: payload.domain,
                tld: payload.tld
            }
        }
    ).then(success).catch(failure),

    loadTrafficSources: (success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/load-traffic-sources/',
    ).then(success).catch(failure),

    loadDeviceTypes: (success, failure) => axios.get(
        '/admin/trafficguard/campaign_wizard/load-device-types/',
    ).then(success).catch(failure),
    
    checkCampaignName: (campaign_name, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/check-campaign-name/',
        {
            campaign_name
        }
    ).then(success).catch(failure),
}
