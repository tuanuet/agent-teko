import React, {PropTypes} from 'react';
import {
    addMessage,
    setAdmin,
    fetchMetadata
} from '../../actions/action';
import Scroll from '../../container/ScrollContainer'
import * as MessageTypes from '../../constants/MessageTypes';
import {execLink} from '../../actions/execLink';

class ChatContent extends React.Component {


    render(){
        // let theme = this.props.theme;
        return(
           <Scroll {...this.props}/>
            /*
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

            </div>*/
        );
    }

};

ChatContent.propTypes = {
    theme: PropTypes.string.isRequired
};

export default ChatContent;