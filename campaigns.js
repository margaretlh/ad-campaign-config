import axios from 'axios'

export default {
    loadAllCampaignsByUser: (payload, success, failure) => {
        return axios.get(
            '/admin/trafficguard/admin_campaigns_by_user/load/',
            payload
        ).then(success).catch(failure)
    },
    loadTrafficQualityScore: (params, success, failure) => {
        return axios.get(
            '/admin/trafficguard/load-traffic-quality-score/',
            {
                params
            }
        ).then(success).catch(failure)
    },
}