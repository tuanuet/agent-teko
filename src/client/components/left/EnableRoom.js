import React, {PropTypes} from 'react';
import _ from 'lodash';

const EnableRoom = ({enableRoom}) => {
    return (
        <div className="tab-pane" id="unchat" role="tabpanel">
            <div className="room-item">
                <div className="customer-control">
                    <img
                        src="https://pluralsight.imgix.net/author/lg/70ada62d-cb01-4114-aa65-e3d18d0494ed.jpeg?w=200"
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
{/*<<<<<<< HEAD*/}
                            {_.last(enableRoom.messages).content}
                        </div>
                        <i className="fa fa-exclamation-triangle text-red" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

EnableRoom.propTypes = {
    enableRoom: PropTypes.object.isRequired
};

export default EnableRoom;