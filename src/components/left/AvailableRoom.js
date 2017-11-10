import React, {PropTypes} from 'react';
import _ from 'lodash';

const AvailableRoom = ({availableRoom, adminChooseRoom, currentRoomId}) => {
    let className = "room-item";
    if (availableRoom.numOfUnReadMessages > 0) {
        className += " unread";
    }

    if (availableRoom.roomId === currentRoomId) {
        className += " active";
    }
    return (
        <div className={className} onClick={adminChooseRoom.bind(this, availableRoom.roomId)} >
            <div className="customer-control">
                <img
                    src="/images/teko_icon.png"
                className="avatar" alt="image"/>
            </div>
            <div className="customer-info">
                <div className="title" >
                    <div className="name" >{availableRoom.customer.name}</div>
                    <div className="timer" >
                        <span>{availableRoom.createdAt}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="last-massage">
                        {availableRoom.roomInfo && availableRoom.roomInfo.latestMessage.content}
                    </div>
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
};

AvailableRoom.propTypes = {
    availableRoom: PropTypes.object.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
};

export default AvailableRoom;
