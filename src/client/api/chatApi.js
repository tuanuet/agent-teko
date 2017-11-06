import axios from 'axios';
import * as apiTypes from '../constants/apiTypes';

class ChatApi {
    static messagesFetchRequested(roomId)
    {
        return axios.get(`${apiTypes.MESSAGES_FETCH_REQUESTED}?roomId=${roomId}`)
            .then(response => response.data);
    }

    static agentsFetchRequested()
    {
        return axios.get(apiTypes.AGENTS_FETCH_REQUESTED)
            .then(response => response.data);
    }

    static saveSelectListAgent(roomId,listAgent)
    {
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
        return axios.post('http://local.chat.com/api/add-other-agents-to-room', formData)
            .then(res => res.data);
    }

    static setStatusOfRoom(roomId, status)
    {
        let formData = new FormData();
        let data = {
            roomId,
            status
        };
        formData.append("data", JSON.stringify(data));
        return axios.post(apiTypes.SET_STATUS_OF_ROOM_REQUESTED, formData)
            .then(res => res.data);
    }

    static postImage(fileToUpload)
    {
        let formData = new FormData();

        formData.append("fileToUpload", fileToUpload);
        return axios.post(apiTypes.UPLOAD_IMAGE_REQUESTED, formData)
            .then(res => res.data);
    }

    static saveTagOfRoom(roomId, tagId) {
        return axios.post(apiTypes.SAVE_TAG_OF_ROOM, {roomId, tagId})
            .then(res => res.data);
    }

    static deleteTagOfRoom(roomId, tagId) {
        return axios.post(apiTypes.DELETE_TAG_OF_ROOM, {roomId, tagId})
            .then(res => res.data);
    }

    static fetchMoreMessages(roomId) {
        return axios.get(`${apiTypes.FETCH_MORE_MESSAGES}?roomId=${roomId}`).then(res => res.data)
    }
}

export default ChatApi;
