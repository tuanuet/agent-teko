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
                        { message.content ? message.content.trim().split(' ').map((word, idx, { length }) => {
                            const space = idx !== length - 1 ? ' ' : ''
                            if (word.startsWith(`https://`) || word.startsWith(`http://`)) {
                                return <a key={idx} href={word} target="_blank">{word}{space}</a>
                            } else {
                                return `${word}${space}`
                            }
                        }) : '' }
                        { message.isError && <div className="error-message">
                            <i className="fa fa-exclamation" aria-hidden="true"></i>
                            Có lỗi xảy ra: FB không cho phép tin nhắn này tới khách hàng
                        </div> }
                    </div>
                </div>
            </div>
        );
    }
}
