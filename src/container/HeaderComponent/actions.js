import * as apiType from '../../constants/apiTypes'
import axios from 'axios'

export const handleBroadcastRoom = agentId => {
    return dispatch => {
        return axios.post(apiType.UPDATE_ADMIN_BROADCAST_ROOMS, { agentId })
            .then(res => res.data)
            .then(res => {
                const { result } = res
                if (!result) {
                    alert(`Có lỗi xảy ra khi cập nhật admin trực. Vui lòng thử lại sau.`)
                } else {
                    location.reload()
                }
            })

    }
}

export const handleUnbroadcastRoom = agentId => {
    return dispatch => {
        return axios.post(apiType.UPDATE_ADMIN_UNBROADCAST_ROOMS, { agentId })
            .then(res => res.data)
            .then(res => {
                const { result } = res
                if (!result) {
                    alert(`Có lỗi xảy ra khi cập nhật admin thoát trực. Vui lòng thử lại sau.`)
                } else {
                    location.reload()
                }
            })

    }
}
