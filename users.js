import axios from 'axios'

export default {
    loadAuthUser: (success, failure) => axios.get('/auth-user/').then(success).catch(failure),
    loadNotifications: (success, failure) => axios.get('/notifications/load/').then(success).catch(failure),
    markNotificationAsRead: (notificationId, success, failure) => axios.get(`/notifications/read/${notificationId}/`).then(success).catch(failure),
    deleteNotification: (notificationId, success, failure) => axios.get(`/notifications/delete/${notificationId}/`).then(success).catch(failure),
    updateTpaPaymentConfiguration: (payload, success, failure) => axios.post(`/admin/publisher/${payload.crossroads_user_id}/tpa_profile/payment-configuration/`, payload).then(success).catch(failure),
    deleteTpaPaymentConfiguration: (payload, success, failure) => axios.post(`/admin/publisher/${payload.crossroads_user_id}/tpa/${payload.tpa_id}/payment-configurations/${payload.config_id}/delete/`, {}).then(success).catch(failure),
    markAllNotificationsAsRead: (success, failure) => axios.get(`/notifications/mark-all-read/`).then(success).catch(failure),
}