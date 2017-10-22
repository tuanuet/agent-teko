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
        return(
           <Scroll {...this.props}/>
        );
    }

};

ChatContent.propTypes = {
    theme: PropTypes.string.isRequired
};

export default ChatContent;