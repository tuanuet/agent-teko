import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class RoomApi {
    static roomsFetchRequested() {
        return axios.get(apiType.ROOMS_FETCH_REQUESTED)
            .then(response => response.data);
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

export default RoomApi;
