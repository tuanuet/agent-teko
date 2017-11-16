import React, { Component } from 'react'

class Audio extends Component {
    render() {
        const { message } = this.props
        const role = message.messageFrom === 0 ? 'self' : 'other'

        return <div className="message-margin">
            <audio className="message-audio" src={message.content} controls />
        </div>
    }
}

export default Audio
