import React, {PropTypes} from 'react';
import _ from 'lodash';
import * as helper from '../../helper'

const EnableRoom = ({enableRoom, currentRoomId, adminChooseRoom}) => {
    let className = 'room-item'

    if (enableRoom.roomInfo && enableRoom.roomInfo.numOfUnReadMessages > 0) className += ' unread'

    if (enableRoom.roomId === currentRoomId) className += ' active'

    return (
        <div className="tab-pane" id="unchat" role="tabpanel" onClick={adminChooseRoom.bind(this, enableRoom.roomId)}>
            <div className={className}>
                <div className="customer-control">
                    <img
                        src={enableRoom.customer.avatarUrl}
                    className="avatar" alt="image"/>
                </div>
                <div className="customer-info">
                    <div className="title">
                        <div className="name">{enableRoom.customer.name}</div>
                        <div className="timer">
                            <span>{enableRoom.roomInfo && helper.formatDatetime(enableRoom.roomInfo.latestMessage.createdAt)}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="last-massage">
                            { enableRoom.roomInfo && helper.formatLatestMessage(enableRoom.roomInfo.latestMessage) }
                        </div>
                        { enableRoom.roomInfo && enableRoom.roomInfo.numOfUnReadMessages > 0 && <div className="numUnread">{enableRoom.roomInfo.numOfUnReadMessages}</div> }
                    </div>
                    { enableRoom.tags && <div className="tags-of-room">
                        { enableRoom.tags.map(tag => <span key={tag.id} className="tag" style={{ backgroundColor: `${tag.color}`}}>
                            { tag.title }
                        </span> ) }
                    </div> }
                </div>
            </div>
        </div>
    );
};

EnableRoom.propTypes = {
    enableRoom: PropTypes.object.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
};

export default EnableRoom;
