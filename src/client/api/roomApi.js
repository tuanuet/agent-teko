import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class RoomApi {
    static roomsFetchRequested() {
        return axios.get(apiType.ROOMS_FETCH_REQUESTED)
            .then(response => response.data);
    }

    static sendRequestJoinRoom(room) {
        return axios.get(`${apiType.SEND_REQUEST_JOIN_ROOM}?roomId=${room.id}`)
            .then(res => res.data);
    }

    static adminJoinRoomToSocketSucceed(room) {
        return axios.get(`${apiType.ADMIN_JOIN_ROOM_SUCCEED}?roomId=${room.id}`)
            .then(res => res.data);
    }

    static listOfTagsFetchRequested() {
        return axios.get(apiType.LIST_OF_TAGS_FETCH_REQUESTED)
            .then(res => res.data);
    }
}

export default RoomApi;
