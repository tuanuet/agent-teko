import React from 'react';
import Rating from '../Message/Rating';
import Notification from '../Message/Notification';
import Default from '../Message/Default';
import Image from '../Message/Image';
import * as MessageTypes from '../../constants/MessageTypes';
import Attachment from '../Message/Attachment'

function getListChat(messages) {
    return messages.map((e, i) => {
        switch (e.messageType) {
        case MessageTypes.NOTIFICATION:
            return <Notification content={e.message.content} key={i}/>;
        case MessageTypes.RATING:
            return <Rating key={i}/>;
        case MessageTypes.IMAGE:
            return <Image key={i} message={e}/>;
        case MessageTypes.ATTACHMENT:
            return <Attachment key={i} message={e}/>;
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