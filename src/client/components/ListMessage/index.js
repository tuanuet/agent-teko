import React from 'react';
import Rating from '../Message/Rating';
import Notification from '../Message/Notification';
import Default from '../Message/Default';
import Image from '../Message/Image';
import * as MessageTypes from '../../constants/MessageTypes';



function getListChat(messages) {
    // console.log("messages", messages);
    return messages.map((e, i) => {
            //Type message default is undefined
        switch (e.messageType) {
        case MessageTypes.NOTIFICATION:
            return <Notification content={e.message.content} key={i}/>;
        case MessageTypes.RATING:
            return <Rating key={i}/>;
        case MessageTypes.IMAGE:
            return <Image key={i} message={e}/>;
        default:
            return <Default message={e} key={i}/>;
        }
    });
}

class ListMessage extends React.Component {

    render() {
        let listMsg = getListChat(this.props.messages);
        return (
            <ol className="chat">
                {listMsg}
            </ol>
        );
    }
}

export default ListMessage;