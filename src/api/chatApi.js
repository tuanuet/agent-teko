import axios from 'axios';
import * as apiTypes from '../constants/apiTypes';

class ChatApi {
    static messagesFetchRequested(roomId) {
        return axios.get(`${apiTypes.MESSAGES_FETCH_REQUESTED}?roomId=${roomId}`)
            .then(response => response.data);
    }

    static agentsFetchRequested() {
        return axios.get(apiTypes.AGENTS_FETCH_REQUESTED)
            .then(response => response.data);
    }

    static saveSelectListAgent(roomId,listAgent) {
        let agents = listAgent.map(id => {
            return {
                agentId : id
            }
        });
        let formData = new FormData();
        let data = {
            roomId: roomId,
            agents: agents
        };
        formData.append("data", JSON.stringify(data));
        const API = `${apiTypes.API_URL}/api/add-other-agents-to-room`
        return axios.post(API, formData)
            .then(res => res.data);
    }

    static setStatusOfRoom(roomId, status) {
        return axios.post(apiTypes.SET_STATUS_OF_ROOM_REQUESTED, { roomId, status })
            .then(res => res.data);
    }

    static postImage(fileToUpload) {
        let formData = new FormData();

        formData.append("fileToUpload", fileToUpload);
        return axios.post(apiTypes.UPLOAD_IMAGE_REQUESTED, formData)
            .then(res => res.data);
    }

    static saveTagOfCustomer(customerId, tagId) {
        return axios.post(apiTypes.SAVE_TAG_OF_CUSTOMER, {customerId, tagId})
            .then(res => res.data);
    }

    static deleteTagOfCustomer(customerId, tagId) {
        return axios.post(apiTypes.DELETE_TAG_OF_CUSTOMER, {customerId, tagId})
            .then(res => res.data);
    }

    static fetchMoreMessages(roomId) {
        return axios.get(`${apiTypes.FETCH_MORE_MESSAGES}?roomId=${roomId}`).then(res => res.data)
    }
}

export default ChatApi;
