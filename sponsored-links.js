import axios from 'axios'

export default {
    loadCategory: (payload, success, failure) => axios.get(
        '/admin/trafficguard/sponsored-links/wizard/category/',
        {
            params: {
                category_id: payload
            }
        }
    ).then(success).catch(failure),

    loadSites: (payload, success, failure) => axios.get(
        '/admin/trafficguard/sponsored-links/wizard/sites/',
        {
            params: {
                user_id: payload
            }
        }
    ).then(success).catch(failure),

    loadPublisherIndex: (success, failure) => axios.get(
        '/admin/sponsored-links/load-publishers/'
    ).then(success).catch(failure),

    loadPublisherCampaigns: (publisherId, success, failure) => axios.get(
        `/admin/sponsored-links/publisher/${publisherId}/load-campaigns/`
    ).then(success).catch(failure),

    createContent: (payload, success, failure) => axios.post(
          '/admin/trafficguard/campaign_wizard/create-content/?meta',
        payload
    ).then(success).catch(failure),

    createArticle: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/create-article/',
        payload
    ).then(success).catch(failure),

    getImages: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/get-images/',
        payload
    ).then(success).catch(failure),

    loadPublisherRevenueDomains: (publisherId, success, failure) => axios.get(
        `/admin/sponsored-links/publisher/${publisherId}/load-revenue-domains/`
    ).then(success).catch(failure),

    loadCampaign: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/campaigns/${payload}/load/`
    ).then(success).catch(failure),

    verifySponsoredLinks: (payload, success, failure) => axios.post(
        '/admin/trafficguard/campaign_wizard/verify-sponsored-links/',
        payload
    ).then(success).catch(failure),

    loadRevenueProviders: (success, failure) => axios.get(
        `/admin/sponsored-links/revenue-providers/`
    ).then(success).catch(failure),

    loadPublisherSiteIndex: (publisherId, success, failure) => axios.get(
        `/admin/sponsored-links/publisher/${publisherId}/load-sites/`
    ).then(success).catch(failure),

    loadSiteZones: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/publisher/${payload.userId}/sites/${payload.siteId}/load-zones/`
    ).then(success).catch(failure),
    
    loadZoneAds: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/publisher/${payload.userId}/sites/${payload.siteId}/zones/${payload.zoneId}/load-ads/`
    ).then(success).catch(failure),

    loadTemplates: (success, failure) => axios.get(
        '/admin/sponsored-links/load-templates/'
    ).then(success).catch(failure),

    loadTemplateSizes: (success, failure) => axios.get(
        '/admin/sponsored-links/load-template-sizes/'
    ).then(success).catch(failure),

    createTemplate: (payload, success, failure) => axios.post(
        '/admin/sponsored-links/create-template/',
        {
            name: payload.name,
            filename: payload.filename,
            path: payload.path,
            width: payload.width,
            height: payload.height,
            links: payload.links,
            private: payload.private,
            owner: payload.owner,
            variables: payload.variables,
            html: payload.html_file,
            snippet: payload.snippet
        }
    ).then(success).catch(failure),

    loadTemplateHtml: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/load-template-html/?template_id=${payload.id}`
    ).then(success).catch(failure),

    loadOwners: (success, failure) => axios.get(
        `/admin/sponsored-links/load-owners/`
    ).then(success).catch(failure),

    updateTemplate: (payload, success, failure) => axios.put(
        '/admin/sponsored-links/update-template/', 
        payload
    ).then(success).catch(failure),

    deleteTemplate: (payload, success, failure) => axios.delete(
        '/admin/sponsored-links/delete-template/', {
            params: {
                template_id: payload.template_id
            }
        }
    ).then(success).catch(failure),

    saveCampaign: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/update-campaign/`,
        payload
    ).then(success).catch(failure),

    createKeywordList: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/create-keyword-list/`,
        payload
    ).then(success).catch(failure),
    
    loadKeywordLists: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/publisher/${payload}/load-keyword-lists/`,
    ).then(success).catch(failure),

    updateSiteName: (payload, success, failure) => axios.put(
        '/admin/sponsored-links/update-site-name/', 
            {
                id: payload.id,
                name: payload.name,
            }
    ).then(success).catch(failure),

    deleteSite: (payload, success, failure) => axios.delete(
        '/admin/sponsored-links/delete-site/', {
            params: {
                id: payload.id
            }
        }
    ).then(success).catch(failure),

    loadZoneAdHtml: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/load-zone-ad-html/?zone_ad_id=${payload.id}`
    ).then(success).catch(failure),

    deleteAd: (payload, success, failure) => axios.delete(
        '/admin/sponsored-links/delete-zone-ad/', {
            params: {
                id: payload.id
            }
        }
    ).then(success).catch(failure),

    cloneZoneAd: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/clone-zone-ad/`,
        payload
    ).then(success).catch(failure),

    loadZoneServingCode: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/load-zone-serving-code/?zone_id=
        ${payload.id}&format=${payload.format}`
    ).then(success).catch(failure),

    deleteZone: (payload, success, failure) => axios.delete(
        '/admin/sponsored-links/delete-zone/', {
            params: {
                id: payload.id
            }
        }
    ).then(success).catch(failure),

    cloneZone: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/clone-zone/`,
        payload
    ).then(success).catch(failure),

    editZone: (payload, success, failure) => axios.put(
        '/admin/sponsored-links/edit-zone/', 
        payload
    ).then(success).catch(failure),

    createZone: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/create-zone/`,
        payload
    ).then(success).catch(failure),

    generateContent: (payload, success, failure) => axios.get(
        `/ai_ml/generate-article/?article_title=${payload.article_title}`
    ).then(success).catch(failure),

    loadRoutingDomains: (success, failure) => axios.get(
        `/admin/sponsored-links/routing-domains/`
    ).then(success).catch(failure),

    loadKeywords: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/load-keywords/?campaign_id=${payload.campaign_id}&container_id=${payload.container_id}
        &all_keywords_for_category=${payload.all_keywords_for_category}`
    ).then(success).catch(failure),

    loadAdData: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/load-ad-data/?container_id=${payload.container_id}`
    ).then(success).catch(failure),

    updateKeywords: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/update-keywords/`,
        payload
    ).then(success).catch(failure),
    
    createCampaign: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/publishers/${payload.user_id}/create-campaign/`,
        payload
    ).then(success).catch(failure),
    
    loadPublisherRoutingDomains: (payload, success, failure) => axios.get(
        `/admin/sponsored-links/publishers/${payload}/routing-domains/`,
    ).then(success).catch(failure),

    createAd: (payload, success, failure) => axios.post(
        `/admin/sponsored-links/create-ad/`,
        payload
    ).then(success).catch(failure),

}
