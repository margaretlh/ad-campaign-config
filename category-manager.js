import axios from 'axios'

export default {
  // Load Category report or options
  loadCategoryReport: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/category/`,
    payload
  ).then(success).catch(failure),
  // Load Category Group report or options
  loadCategoryGroupReport: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/category-group/`,
    payload
  ).then(success).catch(failure),
  // Load Category Manager options
  loadVerticalOptions: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/vertical-options/`,
    payload
  ).then(success).catch(failure),
  // Create category
  createCategory: (payload, success, failure) => axios.post(
    `/admin/trafficguard/category-manager/category/`,
    payload
  ).then(success).catch(failure),
  // Update category
  updateCategory: (payload, success, failure) => axios.put(
    `/admin/trafficguard/category-manager/category/`,
    payload
  ).then(success).catch(failure),
  // Load keywords
  loadKeywords: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/keywords/`,
    payload
  ).then(success).catch(failure),
  // Update category keywords
  updateKeywords: (payload, success, failure) => axios.put(
    `/admin/trafficguard/category-manager/keywords/`,
    payload
  ).then(success).catch(failure),
  // Create category group
  createCategoryGroup: (payload, success, failure) => axios.post(
    `/admin/trafficguard/category-manager/category-group/`,
    payload
  ).then(success).catch(failure),
  // Update category group
  updateCategoryGroup: (payload, success, failure) => axios.put(
    `/admin/trafficguard/category-manager/category-group/`,
    payload
  ).then(success).catch(failure),
  // Load Campaign Mover report
  loadCampaignMoverReport: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/campaign-mover/`,
    payload
  ).then(success).catch(failure),
  // Move Campaigns
  moveCampaigns:  (payload, success, failure) => axios.post(
    `/admin/trafficguard/category-manager/move-campaigns/`,
    payload
  ).then(success).catch(failure),
  // Remove Categories
  removeCategories:  (payload, success, failure) => axios.delete(
    `/admin/trafficguard/category-manager/remove-categories/`,
    payload
  ).then(success).catch(failure),
  // Load action log
  loadActionLog: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/action-log/load/`,
    payload
  ).then(success).catch(failure),
  loadNameSuggestions: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/name-suggester/load/`,
    payload
  ).then(success).catch(failure),
  searchNames: (payload, success, failure) => axios.get(
    `/admin/trafficguard/category-manager/search/`,
    payload
  ).then(success).catch(failure),
}