import React, {PropTypes} from 'react';
import * as helper from '../../helper'

const ClosedRoom = ({closedRoom, currentRoomId, adminChooseRoom}) => {
    let className = "room-item";

    if (closedRoom.roomId === currentRoomId) {
        className += " active";
    }
    return (
        <div className={className} onClick={adminChooseRoom.bind(this, closedRoom.roomId)} >
            <div className="customer-control">
                <img
                    src={closedRoom.customer.avatarUrl}
                className="avatar" alt="image"/>
            </div>
            <div className="customer-info">
                <div className="title">
                    <div className="name">{closedRoom.customer.name}</div>
                    <div className="timer">
                        <span>{helper.formatDatetime(closedRoom.closedAt)}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                </div>
                { closedRoom.tags && <div className="tags-of-room">
                    { closedRoom.tags.map(tag => <span key={tag.id} className="tag" style={{ backgroundColor: `${tag.color}`}}>
                        { tag.title }
                    </span> ) }
                </div> }
            </div>
        </div>
    );
};


const ClosedRooms = ({currentTab, closedRooms, adminChooseRoom, currentRoomId, isHavingMoreClosed, isLoadingMoreRooms, loadClosedRoom}) => {
    return (
        <div className={`tab-pane ${currentTab === 'closed' && 'active'}`} id="closedchat" role="tabpanel">
            {closedRooms.map((closedRoom, index) => {
                return <ClosedRoom
                    key={closedRoom.roomId}
                    closedRoom={closedRoom}
                    currentRoomId={currentRoomId}
                    adminChooseRoom={adminChooseRoom} />
                }
            )}
            { isHavingMoreClosed && (isLoadingMoreRooms ? <div className="text-center">
                <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                <span className="sr-only">Loading...</span>
            </div> : <div className="text-center clickable" onClick={loadClosedRoom} style={{ color: '#2b7ec9' }}>
                Tải thêm
            </div>) }
        </div>
    );
};


export default ClosedRooms;
