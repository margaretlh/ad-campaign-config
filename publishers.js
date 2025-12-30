import axios from 'axios'

export default {
    loadPublisherIndex: (filters, success, failure) => axios.get('/admin/load-publishers/', {
        params: filters
    }).then(success).catch(failure),

    loadPublisherList: (success, failure) => axios.get('/admin/load-publisher-list/')
        .then(success).catch(failure),

    loadWhiteLabelPublisherList: (success, failure) => axios.get('/admin/load-white-label-publisher-list/')
        .then(success).catch(failure),

    loadTpaPaymentConfigurations: (payload, success, failure) => axios.get(
        `/admin/publisher/${payload.userId}/tpa/${payload.tpaId}/payment-configurations/`
    ).then(success).catch(failure),

    loadWhiteLabelSettings: (whiteLabelId, success, failure) => axios.get(
        `/whitelabel/${whiteLabelId}/load-settings/`
    ).then(success).catch(failure),

    updateWhiteLabelSettings: (payload, success, failure) => axios.post(
        `/whitelabel/${payload.whiteLabelId}/update-settings/`,
        payload.config
    ).then(success).catch(failure),

    deactivateWhiteLabelSettings: (payload, success, failure) => axios.post(
        `/whitelabel/${payload.whiteLabelId}/deactivate-settings/`,
        payload
    ).then(success).catch(failure),

    associateWhiteLabelPublisher: (payload, success, failure) => axios.post(
        `/whitelabel/${payload.whiteLabelId}/associate-publisher/`,
        payload
    ).then(success).catch(failure),

    addWhiteLabelAdmin: (payload, success, failure) => axios.post(
        `/whitelabel/${payload.whiteLabelId}/add-admin/`,
        payload
    ).then(success).catch(failure),

    removesWhiteLabelAdmins: (payload, success, failure) => axios.post(
       `/whitelabel/${payload.whiteLabelId}/remove-all-admins/`,
        payload
    ).then(success).catch(failure),

    deleteTpa: (tpaId, success, failure) => axios.get(
        `/admin/publisher/tpa/delete/${tpaId}/`
    ).then(success).catch(failure),
    
    loadTpaRevenueImports: (payload, success, failure) => axios.get(
        `/admin/publisher/${payload.userId}/tpa/${payload.tpaId}/load-revenue-import-logs/`,
        {
            params: {
                date: payload.date
            }
        }
    ).then(success).catch(failure),

    createDirectProfitShareRule: (payload, success, failure) => axios.post(
        `/admin/publisher/${payload.user_id}/direct-profit-share-rule/`,
        payload
    ).then(success).catch(failure),

    loadDirectProfitShareRules: (payload, success, failure) => axios.get(
        `/admin/publisher/${payload}/direct-profit-share-rules/`
    ).then(success).catch(failure),

    deleteDirectProfitShareRule: (payload, success, failure) => axios.get(
        `/admin/publisher/${payload.user_id}/direct-profit-share-rule/${payload.rule_id}/delete/`,
        payload
    ).then(success).catch(failure),
    
    loadPublisherAfdChannels: (payload, success, failure) => axios.get(
        `/admin/publisher/afd-channels/load/`, payload
    ).then(success).catch(failure),

    savePublisherAfdChannelMapping: (payload, success, failure) => axios.post(
        `/admin/publisher/afd-channels/save-mapping/`, payload
    ).then(success).catch(failure),

    deletePublisherAfdChannelMapping: (payload, success, failure) => axios.delete(
        `/admin/publisher/afd-channels/delete-mapping/`,
        payload
    ).then(success).catch(failure),
    
    loadPublisherAfsChannels: (userId, success, failure) => axios.get(
        `/admin/publisher/${userId}/afs-channels/`
    ).then(success).catch(failure),
    
    loadAfsChannel: (payload, success, failure) => axios.get(
        `/admin/afs-channel/${payload.channelId}/`
    ).then(success).catch(failure),

    updateAfsChannel: (payload, success, failure) => axios.put(
        `/admin/publisher/${payload.userId}/afs-channel/${payload.id}/update/`,
        payload
    ).then(success).catch(failure),

    loadPublisherThirdPartyAccountsList: (userId, success, failure) => axios.get(
        `/admin/publisher/${userId}/third-party-account-list/`
    ).then(success).catch(failure),

    transferChannel: (payload, success, failure) => axios.post(
        `/admin/transfer-channel/`,
        payload
    ).then(success).catch(failure),
    
    releaseChannel: (payload, success, failure) => axios.post(
        `/admin/release-channel/${payload}`,
        {}
    ).then(success).catch(failure),
    
    markChannelAsInUse: (payload, success, failure) => axios.post(
        `/admin/mark-channel-in-use/${payload}`,
        {}
    ).then(success).catch(failure),

    bulkChannelAction: (payload, success, failure) => axios.post(
        `/admin/channel-bulk/${payload.action}`,
        payload
    ).then(success).catch(failure),
    loadLinkedUsersOptions: (payload, success, failure) => axios.get(
        `/admin/publisher/profile/linked_users/options/`,
        payload
    ).then(success).catch(failure),

    loadLinkedUsers: (payload, success, failure) => axios.get(
        `/admin/publisher/profile/linked_users/links/`,
        payload
    ).then(success).catch(failure),

    addLinkedUsers: (payload, success, failure) => axios.post(
        `/admin/publisher/profile/linked_users/links/`,
        payload
    ).then(success).catch(failure),

    deleteLinkedUsers: (payload, success, failure) => axios.delete(
        `/admin/publisher/profile/linked_users/links/`,
        payload
    ).then(success).catch(failure),

    loadPublisherPermissions: (payload, success, failure) => axios.get(
        `/admin/publisher/profile/permissions/`,
        payload
    ).then(success).catch(failure),
    
    importChannels: (payload, success, failure) => {

        let formData = new FormData()
        
        Object.keys(payload).forEach(key => {
            formData.append(key, payload[key])
        })
    
        axios.post(
            `/admin/publisher/${payload.publisherId}/import-afs-channels/`,
            formData
        ).then(success).catch(failure)
    },
    
    
    loadAfsThirdPartyAccounts: (publisherId, success, failure) => axios.get(
        `/admin/publisher/${publisherId}/afs-third-party-accounts/`
    ).then(success).catch(failure),
    
    loadFaceBookLibraries: (publisherId, success, failure) => axios.get(
        `/admin/publisher/${publisherId}/load-facebook-ad-libraries/`
    ).then(success).catch(failure),
    
    createFacebookLibrary: (payload, success, failure) => axios.post(
        `/admin/publisher/${payload.publisherId}/facebook-ad-library/`,
        payload
    ).then(success).catch(failure),
    
    deleteFacebookLibrary: (payload, success, failure) => axios.delete(
        `/admin/publisher/${payload.publisherId}/facebook-ad-library/${payload.libraryId}/delete/`,
        payload
    ).then(success).catch(failure),

    loadKeywordLists: (payload, success, failure) => axios.get(
        `/admin/publisher/afd-channels/load-kw-lists/`,
        payload
    ).then(success).catch(failure),

    populateKwList: (payload, success, failure) => axios.post(
        `/admin/publisher/afd-channels/populate-kw-list/`,        
        payload
    ).then(success).catch(failure),
  
    loadPublisherPixels: (publisherId, success, failure) => axios.get(
        `/admin/publisher/${publisherId}/load-pixels/`
    ).then(success).catch(failure),

    loadPixelTypes: (publisherId, success, failure) => axios.get(
        `/admin/publisher/load-pixel-types/`
    ).then(success).catch(failure),
    
    storePixel: (payload, success, failure) => axios.post(
        `/admin/publisher/${payload.user_id}/create-pixel/`,
        payload
    ).then(success).catch(failure),

    loadPixel: (payload, success, failure) => axios.get(
        `/admin/publisher/pixels/${payload.pixelId}/`,
        {
            params: {
                username: payload.username
            }
        }
    ).then(success).catch(failure),
    
    deletePixel: (payload, success, failure) => axios.delete(
        `/admin/publisher/pixels/${payload.pixelId}/delete/`,
        {
            params: {
                username: payload.username
            }
        }
    ).then(success).catch(failure),
    
    updatePixel: (payload, success, failure) => axios.put(
        `/admin/publisher/pixels/${payload.id}/update/`,
        payload
    ).then(success).catch(failure),
}
