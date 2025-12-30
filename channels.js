import axios from 'axios'

export default {
    loadChannelReport: (params, success, failure) => axios.get(
        '/admin/load-channel-report/',
        {
            params
        }
    ).then(success).catch(failure),
}