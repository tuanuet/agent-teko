import React, {PropTypes} from 'react';
import * as types from '../../constants/actionTypes';

const AcceptRoom = ({sendRequestJoinRoom}) => {

    return (
        <div className="bottom">
            <button
                className="btn btn-primary accept-room"
                onClick={sendRequestJoinRoom.bind(this)}
                value="Tiếp nhận tư vấn"
            >Tiếp nhận tư vấn</button>
        </div>
    );
};

AcceptRoom.propTypes = {
    sendRequestJoinRoom: PropTypes.func.isRequired
};

export default AcceptRoom;
