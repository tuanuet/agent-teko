import axios from 'axios';
import * as apiTypes from '../constants/apiTypes';

class ChatApi {
    static messagesFetchRequested(roomId) {
        return axios.get(`${apiTypes.MESSAGES_FETCH_REQUESTED}?roomId=${roomId}`)
            .then(response => response.data);
    }

    static agentsFetchRequested() {
        console.log('agentsFetchRequested');
        return axios.get(apiTypes.AGENTS_FETCH_REQUESTED)
            .then(response => response.data);
    }

    static saveSelectListAgent(roomId,listAgent) {
        let agents = listAgent.map(agent => {
            return {
                agentId : agent.id
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

    // static sendRequestJoinRoom(room) {
    //     return axios.get(`${config.SEND_REQUEST_JOIN_ROOM}?roomid=${room.id}`);
    // }
    //
    // static adminJoinRoomSuccess(room) {
    //     return axios.get(`${config.ADMIN_JOIN_ROOM_SUCCESS}?roomid=${room.id}`);
    // }
    //
    // static loadRoomData(roomId) {
    //     return axios.get(`${config.LOAD_ROOM_DATA}?roomid=${roomId}`);
    // }
    //
    // static confirmAdminReJoinRoom(room) {
    //     return axios.get(`${config.CONFIRM_ADMIN_RE_JOIN_ROOM}?roomid=${room.id}`);
    // }
    //
    // static adminSetTagOfRoom(roomId, status) {
    //     return axios.post(config.ADMNIN_SET_TAG_OF_ROOM, {
    //         roomId,
    //         status
    //     })
    // }
}

export default ChatApi;
