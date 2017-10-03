import React, {PropTypes} from 'react';

const ChatContent = ({theme}) => {
    return(
        <div className={'body ' + theme}>
            <div className="chat-group self">
                <div className="chat">Hello</div>
            </div>
            <div className="chat-group other">
                <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum
                    molestiae
                    quo.
                </div>
            </div>
            <div className="chat-group self">
                <div className="chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid laborum
                    molestiae
                    quo.
                </div>
            </div>
        </div>
    );
};

ChatContent.propTypes = {
    theme: PropTypes.string.isRequired
};

export default ChatContent;