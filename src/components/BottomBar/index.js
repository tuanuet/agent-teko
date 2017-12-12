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

    componentDidMount() {
        this.chatInput.focus()
    }

    componentDidUpdate() {
        this.chatInput.focus()
    }

    handleChatChange = e => {
        this.setState({
            chatValue: e.target.value
        })
    }

    render() {
        const { chatValue } = this.state
        return (
            <div className="bottom">
                <div className="chat-input">
                    <textarea className="form-control" ref={input => this.chatInput = input} onChange={this.handleChatChange} onKeyPress={this.enter} type="text" placeholder="Nhập tin nhắn" rows={2} autoFocus value={chatValue} />
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
