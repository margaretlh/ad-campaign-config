import axios from 'axios'

export default {
    searchForKeywords: (params, success, failure) => axios.get(
        '/utils/keyword-suggestions/',
        {
            params
        }
    ).then(success).catch(failure),
}