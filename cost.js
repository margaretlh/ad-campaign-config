import axios from 'axios'

export default {
  loadCostAccountsSummary: (payload, success, failure) => axios.get(
    '/admin/cost/load-summary/', payload
  ).then(success).catch(failure),
  loadCostSnapshots: (account_id, params, success, failure) => axios.get(
    `/admin/cost/snapshots/${account_id}/load/`,
    {
      params
    }
  ).then(success).catch(failure),
}