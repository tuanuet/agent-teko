import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class RoomApi {
    static roomsFetchRequested() {
        return axios.get(apiType.ROOMS_FETCH_REQUESTED)
            .then(response => response.data);
    }

    static listOfTagsFetchRequested() {
        return axios.get(apiType.LIST_OF_TAGS_FETCH_REQUESTED)
            .then(res => res.data);
    }

    static closedRoomsFetchRequested(){
        return axios.get(apiType.LOAD_CLOSED_ROOMS)
            .then(res => res.data);
    }

}

export default RoomApi;
