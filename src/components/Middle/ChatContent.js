import React, {PropTypes} from 'react';
import Scroll from '../../container/ScrollContainer'


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
