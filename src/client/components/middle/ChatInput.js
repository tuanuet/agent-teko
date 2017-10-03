import React, {PropTypes} from 'react';

const ChatInput = () => {
    return(
        <div className="bottom">
            <div className="chat-input">
                <input className="form-control" type="text" placeholder="Type here"/>
            </div>
            <div className="group-button">
                <a className="button send" href="#"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
            </div>
        </div>
    );
};

export default ChatInput;