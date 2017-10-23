import React from 'react';

export default class Attachment extends React.Component {
    render() {
        let message = this.props.message;

        let role = message.messageFrom === 0 ? 'self' : 'other';
        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div className="chat"><img style={{width: 20}} src="/images/attachment.png"/><a href={message.content}>{message.name}</a></div>
                </div>
            </div>
        );
    }
}
