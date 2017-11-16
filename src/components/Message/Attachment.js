import React from 'react';

export default class Attachment extends React.Component {
    render() {
        let message = this.props.message;

        let role = message.messageFrom === 0 ? 'self' : 'other';
        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div className="chat"><div>
                        <img style={{width: 20, marginRight: 10}} src="/images/client/attachment.png"/><a href={message.content}>{message.fileName}</a>
                    </div></div>
                </div>
            </div>
        );
    }
}
