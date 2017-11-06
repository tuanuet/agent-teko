import React from 'react';
import Rating from '../Message/Rating';
import Notification from '../Message/Notification';
import Default from '../Message/Default';
import Image from '../Message/Image';
import * as MessageTypes from '../../constants/MessageTypes';
import Attachment from '../Message/Attachment'

function getListChat(messages) {
    return messages ? messages.map((e, i) => {
        switch (e.messageType) {
        case MessageTypes.NOTIFICATION:
            return <Notification content={e.message.content} key={i}/>;
        case MessageTypes.RATING:
            return <Rating key={i}/>;
        case MessageTypes.IMAGE:
            return <Image key={i} message={e}/>;
        case MessageTypes.ATTACHMENT_PDF:
        case MessageTypes.ATTACHMENT_WORD:
        case MessageTypes.ATTACHMENT_EXCEL:
        case MessageTypes.ATTACHMENT_FILE:
            return <Attachment key={i} message={e}/>;
        default:
            return <Default message={e} key={i}/>;
        }
    }) : false;
}

class ListMessage extends React.Component {

    fetchMoreMessages = () => {
        const { actions, currentRoomId, nextFetchingRoom } = this.props
        actions.fetchMoreMessages(nextFetchingRoom, currentRoomId)
    }

    render() {
        let listMsg = getListChat(this.props.messages);

        return (
            <ol className="chat">
                { this.props.nextFetchingRoom !== -1 && <div className="text-center clickable"
                    onClick={this.fetchMoreMessages}>
                    Load more
                </div> }
                {listMsg}
            </ol>
        );
    }
}

export default ListMessage;
