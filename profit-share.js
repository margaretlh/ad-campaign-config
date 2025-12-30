import axios from 'axios'

export default {
  loadProfitShareReport: (payload, success, failure) => axios.get(
    `/admin/trafficguard/profit-share-report/load/`,
    payload
  ).then(success).catch(failure),
}