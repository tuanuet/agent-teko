import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class RoomApi {
    static roomsFetchRequested() {
        return axios.get(apiType.ROOMS_FETCH_REQUESTED)
            .then(response => response.data);
    }
}

export default RoomApi;
