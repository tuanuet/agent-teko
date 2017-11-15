import React, {PropTypes} from 'react';
import _ from 'lodash';

const AvailableRoom = ({availableRoom, adminChooseRoom, currentRoomId}) => {
    let className = "room-item";
    if (availableRoom.roomInfo && availableRoom.roomInfo.numOfUnReadMessages > 0) {
        className += " unread";
    }

    if (availableRoom.roomId === currentRoomId) {
        className += " active";
    }
    return (
        <div className={className} onClick={adminChooseRoom.bind(this, availableRoom.roomId)} >
            <div className="customer-control">
                <img
                    src={availableRoom.customer.avatarUrl}
                className="avatar" alt="image"/>
            </div>
            <div className="customer-info">
                <div className="title" >
                    <div className="name">{availableRoom.customer.name}</div>
                    <div className="timer">
                        <span>{availableRoom.roomInfo && availableRoom.roomInfo.latestMessage && availableRoom.roomInfo.latestMessage.createdAt}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="last-massage">
                        {availableRoom.roomInfo && availableRoom.roomInfo.latestMessage && availableRoom.roomInfo.latestMessage.content}
                    </div>
                    {/* <i className="fa fa-paperclip" aria-hidden="true"></i> */}
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
