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

const getListChat = (messages, scrollToBottom, openZooming) => {
    return messages ? messages.map(e => {
        switch (e.messageType) {
        case MessageTypes.IMAGE:
            return <Image
                key={`${e.messageId}_${e.fileName}`}
                message={e}
                openZooming={openZooming}
                scrollToBottom={scrollToBottom}
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
                scrollToBottom={scrollToBottom}
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
    constructor(props) {
        super(props)
        this.state = {
            isZooming: false,
            content: ''
        }
    }

    componentWillMount = () => {
        window.addEventListener('keydown', this.handleKeyEvent)
    }

    componentWillReceiveProps(nextProps) {
        const { currentRoomId, messages, actions, nextFetchingRoom, scrollToBottom } = this.props
        const { currentRoomId: nextRoomId, messages: nextMessages, isLoadingMessages} = nextProps

        if (currentRoomId !== nextRoomId) return false

        if (messages.length < config.MESSAGE_PAGING_VALUE && nextMessages.length < config.MESSAGE_PAGING_VALUE && isLoadingMessages === false) {
            if (nextProps.nextFetchingRoom !== -1) {
                actions.fetchMoreMessages(nextProps.nextFetchingRoom, currentRoomId, scrollToBottom)
            }
        }
    }

    fetchMoreMessages = () => {
        const { actions, currentRoomId, nextFetchingRoom, scrollToBottom } = this.props
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
        const { isZooming, content } = this.state
        const { messages, nextFetchingRoom, isLoadingMessages, scrollToBottom } = this.props
        const listMsg = getListChat(messages, scrollToBottom, this.openZooming)

        return (
            <ol className="chat">
                { nextFetchingRoom !== -1 && !isLoadingMessages && <div className="text-center clickable"
                    onClick={e => { this.fetchMoreMessages() }} style={{ color: '#2b7ec9' }}>
                    Tải thêm
                </div> }
                { isLoadingMessages && <div className="text-center">
                    <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                    <span className="sr-only">Loading...</span>
                </div> }
                <div style={ !isLoadingMessages ? { marginTop: '20px' } : {}}>
                    { listMsg }
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
