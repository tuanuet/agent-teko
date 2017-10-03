import React, {PropTypes} from 'react';

const EnableTabPanel = () => {
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
                        <div className="name">Vu Tuan</div>
                        <div className="timer">
                            <span>10:20 PM</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="last-massage new-message">hello
                            worldasdfasfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf!
                        </div>
                        <i className="fa fa-exclamation-triangle text-red" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnableTabPanel;