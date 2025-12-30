import axios from 'axios'
import { utilities } from '@billow/js-helpers'

export default {
    loadFacebookComplianceIndex: (success, failure) => axios.get(
        '/admin/facebook/load-index/'
    ).then(success).catch(failure),
    loadFacebookPageAds: (pageId, success, failure) => axios.get(
        `/admin/facebook/compliance/${pageId}/load-ads/`
    ).then(success).catch(failure),
    loadComplianceCheck: (adId, success, failure) => axios.get(
        `/admin/facebook/compliance/${adId}/load-check/`
    ).then(success).catch(failure),
    loadProhibitedPhrases: (success, failure) => axios.get(
        `/admin/facebook/prohibited-phrases/load/`
    ).then(success).catch(failure),
    importLibraries: (payload, success, failure) => {
        axios.post(
            `/admin/facebook/import-libraries/`,
            utilities.formData(payload)
        ).then(success).catch(failure)
    },
    storeProhibitedPhrase: (payload, success, failure) => {
        axios.post(
            `/admin/facebook/prohibited-phrase/`,
            payload
        ).then(success).catch(failure)
    },
    deleteProhibitedPhrase: (payload, success, failure) => {
        axios.delete(
            `/admin/facebook/prohibited-phrase/${payload}/delete/`,
        ).then(success).catch(failure)
    },
}