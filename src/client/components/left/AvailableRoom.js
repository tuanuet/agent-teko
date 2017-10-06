import React, {PropTypes} from 'react';
import _ from 'lodash';

const AvailableRoom = ({availableRoom}) => {
    // let lastMessage =
    return (
        <div className="room-item">
            <div className="customer-control">
                <img
                    src="https://pluralsight.imgix.net/author/lg/70ada62d-cb01-4114-aa65-e3d18d0494ed.jpeg?w=200"
                    className="avatar" alt="image"/>
            </div>
            <div className="customer-info">
                <div className="title">
                    <div className="name">{availableRoom.customers[0].customerName}</div>
                    <div className="timer">
                        <span>{availableRoom.createdAt}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="last-massage">
                        {/*{_.last(availableRoom.messages).content}*/}
                        dad
                    </div>
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
};

AvailableRoom.propTypes = {
    availableRoom: PropTypes.object.isRequired
};

export default AvailableRoom;