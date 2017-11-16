import React, { Component } from 'react'

class Video extends Component {
    render() {
        const { message } = this.props
        const role = message.messageFrom === 0 ? 'self' : 'other'

        return <div className="message-margin">
            <video className="message-video" width="480" controls>
                <source src={message.content} />
            </video>
        </div>
    }
}

export default Video
