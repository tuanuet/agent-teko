import React from 'react';

export default class Default extends React.Component {
    render() {
        let message = this.props.message;
        // todo : check right agent because many agent agentId === message.senderId
        let role = message.messageFrom === 0 ? 'self' : 'other';
        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div className="chat">{message.content}</div>
                </div>
            </div>
        );
    }
}
