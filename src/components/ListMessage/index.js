import React from 'react';
import Rating from '../Message/Rating';
import Notification from '../Message/Notification';
import Default from '../Message/Default';
import Image from '../Message/Image';
import Audio from '../Message/Audio'
import Video from '../Message/Video'
import Info from '../Message/Info'
import * as MessageTypes from '../../constants/MessageTypes';
import * as config from '../../constants/config'
import Attachment from '../Message/Attachment'
import * as helper from '../../helper'

const getListChat = (messages, scrollToBottom, openZooming, isSearching, searchMessage, loadingMoreBlock) => {
    return messages ? messages.map((e, idx) => {
        switch (e.messageType) {
        case MessageTypes.IMAGE:
            return <Image
                key={`${e.messageId}_${e.fileName}_${idx}`}
                message={e}
                openZooming={openZooming}
                scrollToBottom={scrollToBottom}
                loadingMoreBlock={loadingMoreBlock}
            />
        case MessageTypes.FILE:
            return <Attachment
                key={`${e.messageId}_${e.fileName}_${idx}`}
                message={e}
            />
        case MessageTypes.AUDIO:
            return <Audio
                key={`${e.messageId}_${e.fileName}_${idx}`}
                message={e}
            />
        case MessageTypes.VIDEO:
            return <Video
                key={`${e.messageId}_${e.fileName}_${idx}`}
                message={e}
                scrollToBottom={scrollToBottom}
                loadingMoreBlock={loadingMoreBlock}
            />
        case MessageTypes.INFO:
            return <Info
                key={`${e.messageId}_${e.fileName}_${idx}`}
                message={e}
            />
        default:
            return <Default
                key={`${e.messageId}_${e.fileName}_${idx}`}
                message={e}
                searchMessage={isSearching && searchMessage}
            />
        }
    }) : false
}

class ListMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isZooming: false,
            content: '',
            loadingMoreBlock: false
        }
    }

    componentWillMount = () => {
        window.addEventListener('keydown', this.handleKeyEvent)
    }

    componentWillReceiveProps(nextProps) {
        const { currentRoomId, currentRoom, actions, nextFetchingRoom, scrollToBottom } = this.props
        const { currentRoomId: nextRoomId, currentRoom: nextRoom, isLoadingMessages} = nextProps

        if (currentRoomId !== nextRoomId) return false
        if (!currentRoom) return false
        if (!nextRoom) return false

        if (currentRoom.messages.length < config.MESSAGE_PAGING_VALUE && nextRoom.messages.length < config.MESSAGE_PAGING_VALUE && isLoadingMessages === false) {
            if (nextProps.nextFetchingRoom !== -1) {
                actions.fetchMoreMessages(nextProps.nextFetchingRoom, currentRoomId, scrollToBottom)
            }
        }
    }

    fetchMoreMessages = () => {
        const { actions, currentRoomId, nextFetchingRoom } = this.props
        actions.fetchMoreMessages(nextFetchingRoom, currentRoomId)
    }

    openZooming = (fileName, content) => {
        if (fileName.includes(`sticker`)) return false

        this.setState({
            isZooming: true,
            content
        })
    }
    handleKeyEvent = e => {
        if (e.keyCode === 27) {
            this.setState({
                isZooming: false,
            })
        }
    }
    closeZooming = e => {
        e.preventDefault()
        if (e.target !== e.currentTarget) return false

        this.setState({
            isZooming: false,
        })
    }

    componentWillUnMount = () => {
        window.removeEventListener('keydown', this.handleKeyEvent)
    }

    render() {
        const { isZooming, content, loadingMoreBlock } = this.state
        const { nextFetchingRoom, isLoadingMessages, currentRoom, scrollToBottom } = this.props
        const { searchMessage, isSearching } = this.props
        const { roomInfo } = currentRoom
        const listMsg = getListChat(currentRoom ? currentRoom.messages : [], scrollToBottom, this.openZooming, isSearching, searchMessage, loadingMoreBlock)

        return (
            <ol className="chat">
                { nextFetchingRoom !== -1 && !isLoadingMessages && <div className="text-center clickable"
                    onClick={e => { this.fetchMoreMessages(); this.setState({ loadingMoreBlock: true }) }} style={{ color: '#2b7ec9' }}>
                    Tải thêm
                </div> }
                { isLoadingMessages && <div className="text-center">
                    <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                    <span className="sr-only">Loading...</span>
                </div> }
                <div style={ !isLoadingMessages ? { marginTop: '20px' } : {}}>
                    { listMsg }
                    { roomInfo && roomInfo.seenAt && <div className="seen-messages">
                        <i className="fa fa-check" aria-hidden="true"></i> Đã xem {helper.formatSeen(roomInfo.seenAt)}
                    </div> }
                </div>
                { isZooming && <div className="image-overlay" onClick={this.closeZooming}>
                    <span>
                        <img className="overlay-content" src={content} />
                        <div className="close-button" onClick={this.closeZooming} title="Ấn ESC để thoát">&times;</div>
                    </span>
                </div> }
            </ol>
        );
    }
}

export default ListMessage;
