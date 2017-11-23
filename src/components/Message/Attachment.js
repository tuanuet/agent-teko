import React from 'react';

export default class Attachment extends React.Component {
    // TODO: Renew link if file URL is out of date
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            content: props.message.content
        }
    }
    render() {
        const { message } = this.props
        const { content, isLoading } = this.state
        const role = message.messageFrom === 0 ? 'self' : 'other'

        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div className="chat"><div>
                        <img style={{width: 20, marginRight: 10}} src="/images/client/attachment.png"/><a href={content}>{message.fileName}</a>
                    </div></div>
                </div>
            </div>
        );
    }
}
