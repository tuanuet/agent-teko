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

const getListChat = messages => {
    return messages ? messages.map(e => {
        switch (e.messageType) {
        case MessageTypes.IMAGE:
            return <Image
                key={`${e.messageId}_${e.fileName}`}
                message={e}
            />
        case MessageTypes.FILE:
            return <Attachment
                key={`${e.messageId}_${e.fileName}`}
                message={e}
            />
        case MessageTypes.AUDIO:
            return <Audio
                key={`${e.messageId}_${e.fileName}`}
                message={e}
            />
        case MessageTypes.VIDEO:
            return <Video
                key={`${e.messageId}_${e.fileName}`}
                message={e}
            />
        default:
            return <Default
                message={e}
                key={`${e.messageId}_${e.fileName}`}
            />
        }
    }) : false
}

class ListMessage extends React.Component {
    componentWillReceiveProps(nextProps) {
        const { currentRoomId, messages, actions, nextFetchingRoom } = this.props
        const { currentRoomId: nextRoomId, messages: nextMessages, isLoadingMessages} = nextProps

        if (currentRoomId !== nextRoomId) return false

        if (messages.length === 0 && nextMessages.length < config.MESSAGE_PAGING_VALUE && isLoadingMessages === false) {
            actions.fetchMoreMessages(nextFetchingRoom, currentRoomId)
        }
    }

    fetchMoreMessages = () => {
        const { actions, currentRoomId, nextFetchingRoom } = this.props
        actions.fetchMoreMessages(nextFetchingRoom, currentRoomId)
    }

    render() {
        const { messages, nextFetchingRoom, isLoadingMessages } = this.props
        const listMsg = getListChat(messages)

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
                <div style={ !isLoadingMessages ? { marginTop: '20px' } : {}}>
                    { listMsg }
                </div>
            </ol>
        );
    }
}

export default ListMessage;
