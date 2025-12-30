import axios from 'axios'

export default {
  loadProviderType: (payload, success, failure) => axios.get(
    `/admin/v2/report/provider/type/load/`, payload
  ).then(success).catch(failure),
  loadDrid: (payload, success, failure) => axios.get(
    `/admin/v2/report/drid/load/`, payload
  ).then(success).catch(failure)
}