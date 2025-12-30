import axios from 'axios'

export default {
    getTpaPassword: (tpaId, success, failure) => axios.get(
        `/admin/tpa/${tpaId}/get-password/`
    ).then(success).catch(failure),

    revealTpaPassword: (tpaId, password, success, failure) => axios.post(
        `/admin/tpa/${tpaId}/reveal-password/`,
        {password}
    ).then(success).catch(failure),

    updatePassword: (payload, success, failure) => axios.post(
        `/admin/tpa/${payload.tpaId}/update-password/`,
        {
            password: payload.password
        }).then(success).catch(failure)

}