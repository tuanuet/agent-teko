import React from 'react'
import EmojiBoard from '../EmojiBoard/index'
import * as actions from '../../actions/action'
import moment from 'moment'

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
            isShowEmojiBoard: false
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
    }

    handleDragLeave = e => {
        e.preventDefault()
        this.setState({
            isDragOver: false
        })
    }

    render() {
        const { chatValue, isDragOver } = this.state
        return (
            <div className={`bottom`}>
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
                    <label>
                        <input type="file" ref={input => this.attachInput = input} onChange={this.uploadImage} />
                        <i className="fa fa-paperclip"/>
                    </label>
                </div>
                {this.state.isShowEmojiBoard && <EmojiBoard/> }
            </div>
        )
    }

}

export default BottomBar
