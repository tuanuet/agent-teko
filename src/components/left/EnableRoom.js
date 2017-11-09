import React, {PropTypes} from 'react';
import _ from 'lodash';

const EnableRoom = ({enableRoom, adminChooseRoom}) => {
    return (
        <div className="tab-pane" id="unchat" role="tabpanel" onClick={adminChooseRoom.bind(this, enableRoom.id)}>
            <div className="room-item">
                <div className="customer-control">
                    <img
                        src="/images/teko_icon.png"
                    className="avatar" alt="image"/>
                </div>
                <div className="customer-info">
                    <div className="title">
                        <div className="name">{enableRoom.customers[0].customerName}</div>
                        <div className="timer">
                            <span>{enableRoom.createdAt}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="last-massage new-message">
                            {_.last(enableRoom.messages) && _.last(enableRoom.messages).content}
                        </div>
                        {/*<i className="fa fa-exclamation-triangle text-red" aria-hidden="true"></i>*/}
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
