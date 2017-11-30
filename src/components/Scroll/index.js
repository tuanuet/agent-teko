import React from 'react'
import ListMessage from '../ListMessage'
import * as ReactDOM from "react-dom"


class Scroll extends React.Component {
    constructor(props) {
        super(props)
        this.activeScroll = false
        this.currentChatHeight = 0
    }

    scrollToBottom = () => {
        const chatNode = ReactDOM.findDOMNode(this.messagesContainer)
        chatNode.scrollIntoView(false)
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentWillReceiveProps = nextProps => {
        const { messages, currentRoomId } = this.props
        const { messages: nextMessages, currentRoomId: nextCurrentRoomId } = nextProps

        if (currentRoomId !== nextCurrentRoomId) {
            this.activeScroll = true
        } else if (JSON.stringify(messages ? messages.slice(-1).pop() : {})
            !== JSON.stringify(nextMessages ? nextMessages.slice(-1).pop() : {})) {
            this.activeScroll = true
        }
    }

    componentDidUpdate = () => {
        const chatNode = ReactDOM.findDOMNode(this.messagesContainer)
        if (this.activeScroll) {
            this.scrollToBottom()
            this.activeScroll = false
            this.currentChatHeight = chatNode.scrollHeight
        } else if (this.currentChatHeight !== chatNode.scrollHeight) {
            chatNode.parentNode.scrollTop = chatNode.scrollHeight - this.currentChatHeight
            this.currentChatHeight = chatNode.scrollHeight
        }
    }

    render() {
        const { theme } = this.props
        return (
            <div className={`body ${theme}`} >
                <ListMessage
                    ref={el => { this.messagesContainer = el }}
                    {...this.props}
                    scrollToBottom={this.scrollToBottom}
                />
                <div style={{float: 'left', clear: 'both'}}>
                </div>
            </div>
        )
    }
}

export default Scroll
