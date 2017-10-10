import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class RoomApi {
    static roomsFetchRequested() {
        return axios.get(apiType.ROOMS_FETCH_REQUESTED)
            .then(response => response.data);
    }

    static sendRequestJoinRoom(roomId) {
        return axios.get(`${apiType.SEND_REQUEST_JOIN_ROOM}?roomid=${room.id}`)
            .then(res => res.data.result);
    }

    static adminJoinRoomToSocketSucceed(room) {
        return axios.get(`${apiType.ADMIN_JOIN_ROOM_SUCCEED}?roomid=${room.id}`);
    }
}

export default RoomApi;
