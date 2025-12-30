import axios from 'axios'

export default {
    loadRelativeKeywordValues: (category, success, failure) => axios.get(
        `/ai_ml/retrieve/relative-keyword-values/?category_name=${category}`,
    ).then(success).catch(failure),
    loadCategoryTrends: (payload, success, failure) =>
    axios.get(
        `/ai_ml/retrieve/category-trends/` +
        `?country_code=${payload.country_code}` +
        `&device_type=${payload.device_type}`
    ).then(success).catch(failure),
    loadMarketSectorAnalysis: (payload, success, failure) => 
    axios.get(
        `/ai_ml/retrieve/market-sector-analysis/` +
        `?category_name=${payload.category_name}`
    ).then(success).catch(failure),
    flagKeyword: (payload, success, failure) => axios.post(
        `/ai_ml/flag-keyword/`,
        payload
    ).then(success).catch(failure),
}
