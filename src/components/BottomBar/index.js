import React from 'react'
import EmojiBoard from '../EmojiBoard'
import * as actions from '../../actions/action'
import moment from 'moment'
import ReplyBoard from './ReplyBoard'

const getMessageFromClient = message => {
    const { senderId, senderName, messageType, messageFrom, content, fileName, createdAt } = message
    return {
        messageId: moment().format('x'),
        senderId,
        senderName,
        messageType,
        messageFrom,
        content,
        fileName,
        createdAt
    }
}
class BottomBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chatValue: '',
            isDragOver: false,
            isShowEmojiBoard: false,
            isShowReplyBoard: false
        }
    }
    enter = e => {
        if (e.charCode === 13 && !e.shiftKey) {
            e.preventDefault()
            this.send()
        }
    }
    getMessageToSendServer = () => {
        const { chatValue } = this.state
        const { currentRoom, agent } = this.props
        return {
            roomId: currentRoom.roomId,
            roomType: currentRoom.roomType,
            senderId: agent.id,
            senderName: agent.name,
            messageType: 100,
            messageFrom: 0,
            content: chatValue,
            fileName: null,
            customer: currentRoom.customer,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
    send = () => {
        const { chatValue } = this.state
        if (chatValue === '') return false

        const msg = this.getMessageToSendServer()
        this.props.dispatch(actions.addMessageForRoom(msg.roomId, getMessageFromClient(msg)))
        this.props.dispatch(actions.clientSendMessage(msg))

        this.setState({
            chatValue: ''
        })
    }
    sendSeenMessage = () => {
        const { dispatch, currentRoom, agent } = this.props
        const { roomId, roomType, customer } = currentRoom
        const { id: agentId, name: agentName } = agent

        const message = {
            roomId,
            roomType,
            senderId: agentId,
            senderName: agentName,
            messageType: 110,
            messageFrom: 0,
            content: `${agentName} đánh dấu đã đọc tin nhắn`,
            fileName: null,
            customer: customer,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        dispatch(actions.addMessageForRoom(roomId, getMessageFromClient(message)))
        dispatch(actions.clientSendMessage(message))

        this.setState({
            chatValue: ''
        })
    }
    uploadImage = e => {
        const { currentRoom, agent, uploadFile } = this.props
        const input = this.attachInput

        if (input.files && input.files[0]) {
            uploadFile({
                data: input.files[0],
                type: input.files[0].type,
                name: input.files[0].name,
                room: {
                    roomId: currentRoom.roomId,
                    roomType: currentRoom.roomType,
                    senderId: agent.id,
                    senderName: agent.name,
                    messageFrom: 0,
                    customer: currentRoom.customer,
                }
            })
        }

        this.setState({
            chatValue: ''
        })
    }
    handlePasteEvent = e => {
        const { currentRoom, agent, uploadFile } = this.props
        const { items } = e.clipboardData
        const item = items[0]
        if (!item.type.includes('image')) return false

        const itemFile = item.getAsFile()
        uploadFile({
            data: itemFile,
            type: itemFile.type,
            name: itemFile.name,
            room: {
                roomId: currentRoom.roomId,
                roomType: currentRoom.roomType,
                senderId: agent.id,
                senderName: agent.name,
                messageFrom: 0,
                customer: currentRoom.customer,
            }
        })
        this.setState({
            chatValue: ''
        })
    }
    componentDidMount() {
        this.chatInput.focus()
        window.addEventListener('paste', this.handlePasteEvent)
    }
    componentDidUpdate() {
        this.chatInput.focus()
    }
    componentWillUnmount() {
        window.removeEventListener('paste', this.handlePasteEvent)
    }
    handleChatChange = e => {
        this.setState({
            chatValue: e.target.value
        })
    }
    handleDrop = e => {
        e.preventDefault()
        const { uploadFile, currentRoom, agent } = this.props

        const data = e.dataTransfer
        if (data.items) {
            const dropFile = data.items[0]
            if (dropFile.kind === 'file') {
                const itemFile = dropFile.getAsFile()
                uploadFile({
                    data: itemFile,
                    type: itemFile.type,
                    name: itemFile.name,
                    room: {
                        roomId: currentRoom.roomId,
                        roomType: currentRoom.roomType,
                        senderId: agent.id,
                        senderName: agent.name,
                        messageFrom: 0,
                        customer: currentRoom.customer,
                    }
                })
            }
        }
        this.setState({
            chatValue: '',
            isDragOver: false
        })
    }
    handleDragEnter = e => {
        e.preventDefault()
        this.setState({
            isDragOver: true
        })
    };

    handleDragLeave = e => {
        e.preventDefault()
        this.setState({
            isDragOver: false
        })
    };

    toggleEmojiBoard = e => {
        this.setState(prevState => ({
            isShowEmojiBoard: !prevState.isShowEmojiBoard
        }))
    };

    toggleReplyBoard = e => {
        this.setState(prevState => ({
            isShowReplyBoard: !prevState.isShowReplyBoard
        }))
    };

    insertEmoji = char => {
        this.setState(prev => ({
            chatValue: prev.chatValue + char
        }))
    };

    insertQuickReply = replyContent => {
        console.log("hello insert quick reply: " + replyContent);
        this.setState(prev => ({
            chatValue: prev.chatValue + ' ' + replyContent
        }));
    }

    editQuickReply = (replyId, replyContent) => {

        this.props.dispatch(actions.updateQuickReply(replyId, replyContent));
    };

    deleteQuickReply = (replyId) => {
        if(confirm("Xác nhận xóa tin nhắn nhanh này ?")) {
            this.props.dispatch(actions.deleteQuickReply(replyId))
        }
    };

    addQuickReply = replyContent => {
        this.props.dispatch(actions.addQuickReply(replyContent));
    };

    render() {

        const { chatValue, isDragOver, isShowEmojiBoard, isShowReplyBoard } = this.state;
        const { currentRoom, agent, isMobile } = this.props;

        const showSeenIcon = currentRoom.roomInfo
            && currentRoom.roomInfo.latestMessage
            && currentRoom.roomInfo.latestMessage.messageFrom === 1

        return (
            <div className={`bottom`}>
                <div className="icon-reply">
                    <i className="fa fa-bars clickable" title="Trả lời nhanh" aria-hidden="true" onClick={this.toggleReplyBoard}></i>

                    {isShowReplyBoard && <ReplyBoard
                        insertQuickReply={this.insertQuickReply}
                        toggleReplyBoard={this.toggleReplyBoard}
                        editQuickReply = {this.editQuickReply}
                        deleteQuickReply = {this.deleteQuickReply}
                        addQuickReply = {this.addQuickReply}
                        replies = {agent.replies}
                    /> }
                </div>
                <div className={`chat-input ${isDragOver ? `dragover` : ``}`}>
                    <textarea className="form-control"
                        rows={2}
                        type="text"
                        value={chatValue}
                        placeholder={!isDragOver ? 'Nhập tin nhắn' : 'Thả File tại đây'}
                        ref={input => this.chatInput = input}
                        onDragEnter={this.handleDragEnter}
                        onDragLeave={this.handleDragLeave}
                        onDrop={this.handleDrop}
                        onChange={this.handleChatChange}
                        onKeyPress={this.enter}
                        autoFocus />
                </div>
                <div className="icon-button">
                    <i className="fa fa-smile-o clickable" aria-hidden="true" onClick={this.toggleEmojiBoard}></i>
                    { showSeenIcon && <i className="fa fa-eye clickable" aria-hidden="true" onClick={this.sendSeenMessage}></i> }
                    <label>
                        <input type="file" ref={input => this.attachInput = input} onChange={this.uploadImage} />
                        <i className="fa fa-paperclip clickable" aria-hidden="true"></i>
                    </label>
                    { isMobile && <i className="fa fa-paper-plane-o" aria-hidden="true" onClick={this.send}></i> }
                    { isShowEmojiBoard && <EmojiBoard
                        insertEmoji={this.insertEmoji}
                        toggleEmojiBoard={this.toggleEmojiBoard} /> }
                </div>
            </div>
        )
    }

}

export default BottomBar
