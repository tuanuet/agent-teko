import React, {PropTypes} from 'react';

const ClosedRoom = ({closedRoom, currentRoomId, adminChooseRoom}) => {
    let className = "room-item";

    if (closedRoom.roomId === currentRoomId) {
        className += " active";
    }
    return (
        <div className={className} onClick={adminChooseRoom.bind(this, closedRoom.roomId)} >
            <div className="customer-control">
                <img
                    src="/images/teko_icon.png"
                className="avatar" alt="image"/>
            </div>
            <div className="customer-info">
                <div className="title" >
                    <div className="name" >{closedRoom.customer.name}</div>
                    <div className="timer" >
                        <span>{closedRoom.createdAt}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="last-massage">
                        {closedRoom.roomInfo && closedRoom.roomInfo.latestMessage.contents}
                    </div>
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
};


const ClosedRooms = ({closedRooms, adminChooseRoom, currentRoomId}) => {
    return (
        <div className="tab-pane" id="closedchat" role="tabpanel">
            {closedRooms.map((closedRoom, index) => {
                return <ClosedRoom
                    key={index}
                    closedRoom={closedRoom}
                        currentRoomId={currentRoomId}
                        adminChooseRoom={adminChooseRoom}/>
                }
            )}

        </div>
    );
};


export default ClosedRooms;
