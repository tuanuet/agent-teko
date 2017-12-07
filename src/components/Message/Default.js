import React from 'react';

export default class Default extends React.Component {

    render() {
        let message = this.props.message;
        let role = message.messageFrom === 0 ? 'self' : 'other';
        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div
                        className="chat"
                        title={message.createdAt}>
                        <div className="sender-name">{message.senderName}</div>
                        { message.content.startsWith(`https://`) || message.content.startsWith(`http://`)
                            ? <a href={message.content} target="_blank">{message.content}</a>
                            : (message.content || '') }
                    </div>
                </div>
            </div>
        );
    }
}
