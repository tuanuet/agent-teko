import React from 'react';

export default class Default extends React.Component {

    render() {
        let message = this.props.message;
        let role = message.messageFrom === 0 ? 'self' : 'other';
        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div className={`chat ${message.isError ? `faded` : ``}`}
                        title={message.createdAt}>
                        <div className="sender-name">{message.senderName}</div>
                        { message.content.startsWith(`https://`) || message.content.startsWith(`http://`)
                            ? <a href={message.content} target="_blank">{message.content}</a>
                            : (message.content || '') }
                        { message.isError && <div className="error-message">
                            <i class="fa fa-exclamation" aria-hidden="true"></i>
                            Có lỗi xảy ra: FB không cho phép tin nhắn này tới khách hàng
                        </div> }
                    </div>
                </div>
            </div>
        );
    }
}
