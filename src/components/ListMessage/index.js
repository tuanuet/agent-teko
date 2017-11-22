import React from 'react';
import Rating from '../Message/Rating';
import Notification from '../Message/Notification';
import Default from '../Message/Default';
import Image from '../Message/Image';
import Audio from '../Message/Audio'
import Video from '../Message/Video'
import * as MessageTypes from '../../constants/MessageTypes';
import * as config from '../../constants/config'
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
        case MessageTypes.FILE:
            return <Attachment key={i} message={e}/>;
        case MessageTypes.AUDIO:
            return <Audio key={i} message={e} />
        case MessageTypes.VIDEO:
            return <Video key={i} message={e} />
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
        const { messages, nextFetchingRoom, isLoadingMessages } = this.props
        let listMsg = getListChat(messages);

        return (
            <ol className="chat">
                { nextFetchingRoom !== -1 && !isLoadingMessages && <div className="text-center clickable"
                    onClick={e => { this.fetchMoreMessages(); this.props.calculateScroll() }} style={{ color: '#2b7ec9' }}>
                    Tải thêm
                </div> }
                { isLoadingMessages && <div className="text-center">
                    <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                    <span className="sr-only">Loading...</span>
                </div> }
                {listMsg}
            </ol>
        );
    }
}

export default ListMessage;
