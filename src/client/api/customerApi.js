import axios from 'axios';
import * as apiType from '../constants/apiTypes';

class CustomerApi {
    static historyChatFetchRequested(roomId) {
        return axios.get(`${apiType.HISTORY_CHAT_FETCH_REQUESTED}?roomId=${roomId}`)
            .then(response => response.data);
    }

}

export default CustomerApi;
