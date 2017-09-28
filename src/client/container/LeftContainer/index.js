import React from 'react';
import {connect} from 'react-redux';

class LeftContainer extends React.Component {

    render() {
        return (
            <div className="left">
                <div>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#chat" role="tab"
                               aria-controls="available">Available</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#unchat" role="tab" aria-controls="enable">Enable<span
                                className="badge badge-danger">5</span></a>
                        </li>
                    </ul>
                </div>

                <div className="search-bar">
                    <div className="input-group">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input type="text" className="form-control" placeholder="Search"
                               aria-describedby="btnGroupAddon"/>
                    </div>
                </div>

                <div className="tab-content">
                    <div className="tab-pane active" id="chat" role="tabpanel">
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
                                    <div className="last-massage">hello
                                        worldasdfasfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf!
                                    </div>
                                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                                </div>
                            </div>


                        </div>
                    </div>
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
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(LeftContainer);
