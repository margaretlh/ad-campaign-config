import axios from 'axios'

export default {

    loadProviderPeriodDetail: (payload, success, failure) => axios.get(
        `/accounting/providers/${payload.periodId}/detail/${payload.providerId}/load/`
    ).then(success).catch(failure),

    confirmPartnerPayment: (payload, success, failure) => axios.post(
        `/accounting/providers/${payload.periodId}/detail/${payload.providerId}/confirm-partner-payment/`,
        payload
    ).then(success).catch(failure),

    deleteConfirmedPartnerPayment: (payload, success, failure) => axios.post(
        `/accounting/providers/${payload.periodId}/detail/${payload.providerId}/delete-partner-payment/`,
        payload
    ).then(success).catch(failure),

    deleteExpectedPayment: (payload, success, failure) => axios.post(
        `/accounting/providers/${payload.periodId}/detail/${payload.providerId}/delete-expected-payment/`,
        payload
    ).then(success).catch(failure),

    storeExpectedAmountAdjustment: (payload, success, failure) => axios.post(
        `/accounting/providers/${payload.periodId}/detail/${payload.providerId}/stored-adjusted-amount/`,
        payload
    ).then(success).catch(failure),

    loadPeriodDetailForUser: (userPeriodId, success, failure) => axios.get(
        `/accounting/period/${userPeriodId}/load-detail/`,
    ).then(success).catch(failure),

    loadTpaMetaForEarningsAdjustment: (payload, success, failure) => axios.get(
        `/accounting/period/${payload.userPeriodId}/load-earnings-adjustment-meta/`,
        {
            params: {
                tpa_id: payload.tpaId
            }
        }
    ).then(success).catch(failure),

    submitEarningsAdjustment: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/capture-earnings-adjustment/`,
        payload
    ).then(success).catch(failure),

    deleteEarningsLineItem: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/delete-line-item/`,
        payload
    ).then(success).catch(failure),

    captureUserPeriodPayment: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/capture-payment/`,
        payload
    ).then(success).catch(failure),

    updateUserPeriodPayment: (payload, success, failure) => axios.post(
        `/accounting/payment/${payload.id}/`,
        payload
    ).then(success).catch(failure),

    deleteUserPeriodPayment: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/delete-payment/`,
        payload
    ).then(success).catch(failure),

    recalculateUserPeriodRevenue: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/recalculate-revenue/`,
        payload
    ).then(success).catch(failure),

    updateUserPeriodNote: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/update-note/`,
        payload
    ).then(success).catch(failure),

    toggleUserPeriod: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/toggle-lock/`,
        payload
    ).then(success).catch(failure),

    loadUserPeriodPaymentInformation: (userPeriodId, success, failure) => axios.get(
        `/accounting/period/${userPeriodId}/load-payment-information/`,
    ).then(success).catch(failure),

    saveUserPeriodPaymentInfo: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/update-payment-information/`,
        payload
    ).then(success).catch(failure),

    releaseUserPeriodData: (userPeriodId, success, failure) => axios.post(
        `/accounting/period/${userPeriodId}/release-period-data/`,
        {}
    ).then(success).catch(failure),

    releaseUserPeriodsForPeriod: (periodId, success, failure) => axios.post(
        `/accounting/period/${periodId}/release-user-periods-for-period/`,
        {}
    ).then(success).catch(failure),

    unreleaseUserPeriodsForPeriod: (periodId, success, failure) => axios.post(
        `/accounting/period/${periodId}/unrelease-user-periods-for-period/`,
        {}
    ).then(success).catch(failure),

    unreleaseUserPeriodData: (userPeriodId, success, failure) => axios.post(
        `/accounting/period/${userPeriodId}/unrelease-period-data/`,
        {}
    ).then(success).catch(failure),

    loadTpaAdjustments: (payload, success, failure) => axios.get(
        `/accounting/load-tpa-adjustments/${payload.paymentPeriodId}/`,
        {
            params: payload.params
        }
    ).then(success).catch(failure),

    loadConfirmedTpaPayments: (payload, success, failure) => axios.get(
        `/accounting/load-confirmed-tpa-payments/${payload.paymentPeriodId}/`,
        {
            params: payload.params
        }
    ).then(success).catch(failure),

    bulkConfirmTpaPayments: (payload, success, failure) => axios.post(
        `/accounting/tpa-adjustments/${payload.paymentPeriodId}/bulk-confirm/`,
        {
            payments: payload.payments
        }
    ).then(success).catch(failure),

    bulkDeleteConfirmedTpaPayments: (payload, success, failure) => axios.post(
        `/accounting/tpa-adjustments/${payload.paymentPeriodId}/bulk-delete/`,
        {
            tpa_ids: payload.tpa_ids
        }
    ).then(success).catch(failure),

    confirmTpaPayment: (payload, success, failure) => axios.post(
        `/accounting/tpa-adjustments/${payload.paymentPeriodId}/confirm-payment/`,
        payload
    ).then(success).catch(failure),

    deleteConfirmedTpaPayment: (payload, success, failure) => axios.post(
        `/accounting/tpa-adjustments/${payload.paymentPeriodId}/delete-confirmed-payment/`,
        payload
    ).then(success).catch(failure),

    submitTpaAdjustment: (payload, success, failure) => axios.post(
        `/accounting/tpa-adjustments/${payload.paymentPeriodId}/manual-adjustment/`,
        payload
    ).then(success).catch(failure),

    loadTpaNotes: (payload, success, failure) => axios.get(
        `/accounting/tpa_adjustments/notes/${payload}/`,
    ).then(success).catch(failure),

    updateTpaNotes: (payload, success, failure) => axios.post(
        `/accounting/tpa_adjustments/update-notes/${payload.tpaId}/`,
        payload
    ).then(success).catch(failure),

    storeManualAdjustedCostAdjustment: (payload, success, failure) => axios.post(
        `/accounting/period/${payload.userPeriodId}/manual-adjusted-cost-adjustment/`,
        payload
    ).then(success).catch(failure),

    loadMonthlyOveriew: (payload, success, failure) => axios.get(
        `/accounting/load-monthly-overview/`,
        {
            params: payload.params
        }
    ).then(success).catch(failure),

    loadPeriodOveriew: (payload, success, failure) => axios.get(
        `/accounting/load-period-overview/`,
        payload
    ).then(success).catch(failure),

    loadUserPeriodList: (payload, success, failure) => axios.get(
        `/accounting/user/${payload}/period-list/`,
    ).then(success).catch(failure),

    loadTpaManualAdjustments: (payload, success, failure) => axios.get(
        `/accounting/manual-adjustments/load/`, payload
    ).then(success).catch(failure),

}