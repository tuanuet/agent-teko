import React, {PropTypes} from 'react';
import _ from 'lodash';

const EnableRoom = ({enableRoom, adminChooseRoom}) => {
    return (
        <div className="tab-pane" id="unchat" role="tabpanel" onClick={adminChooseRoom.bind(this, enableRoom.roomId)}>
            <div className="room-item">
                <div className="customer-control">
                    <img
                        src="/images/teko_icon.png"
                    className="avatar" alt="image"/>
                </div>
                <div className="customer-info">
                    <div className="title">
                        <div className="name">{enableRoom.customer.name}</div>
                        <div className="timer">
                            <span>{enableRoom.createdAt}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="last-massage new-message">
                            {enableRoom.roomInfo && enableRoom.roomInfo.latestMessage.content}
                        </div>
                    </div>
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
