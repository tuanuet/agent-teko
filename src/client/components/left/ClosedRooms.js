import React, {PropTypes} from 'react';

const ClosedRoom = ({closedRoom, currentRoomId, adminChooseRoom}) => {
    let className = "room-item";

    if (closedRoom.id === currentRoomId) {
        className += " active";
    }
    return (
        <div className={className} onClick={adminChooseRoom.bind(this, closedRoom.id)} >
            <div className="customer-control">
                <img
                    src="https://pluralsight.imgix.net/author/lg/70ada62d-cb01-4114-aa65-e3d18d0494ed.jpeg?w=200"
                className="avatar" alt="image"/>
            </div>
            <div className="customer-info">
                <div className="title" >
                    <div className="name" >{closedRoom.customers[0].customerName}</div>
                    <div className="timer" >
                        <span>{closedRoom.createdAt}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="last-massage" >
                        {_.last(closedRoom.messages) > 0 && _.last(closedRoom.messages).content}
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
            {closedRooms.map(closedRoom => {
                    return <ClosedRoom
                        key={closedRoom.id}
                        closedRoom={closedRoom}
                        currentRoomId={currentRoomId}
                        adminChooseRoom={adminChooseRoom}/>
                }
            )}

        </div>
    );
};


export default ClosedRooms;
