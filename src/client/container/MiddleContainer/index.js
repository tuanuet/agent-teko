import React from 'react';
import {connect} from 'react-redux';

class MiddleContainer extends React.Component {

    render() {
        return (
            <div className="middle">
                <div className="header">
                    <div className="title">
                        <div>CHAT HEADER</div>
                        <div className="group-button">
                            <button className="btn btn-primary">Chuyển</button>
                            <button className="btn btn-primary">ABC</button>
                            <button className="btn btn-outline-danger">Close room</button>
                        </div>
                    </div>

                    <div className="list-tag">
                        <button className="tag">Sale</button>
                        <button className="tag">Active</button>
                        <button className="tag red">Delay</button>
                    </div>
                </div>
                <div className="body">
                    <div className="chat-group self">
                        <div className="chat">Hello</div>
                    </div>
                    <div className="chat-group other">
                        <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum molestiae
                            quo.
                        </div>
                    </div>
                    <div className="chat-group self">
                        <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum molestiae
                            quo.
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="chat-input">
                        <input className="form-control" type="text" placeholder="Type here"/>
                    </div>
                    <div className="group-button">
                        <a className="button send" href="#"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(MiddleContainer);