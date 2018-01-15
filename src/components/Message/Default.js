import React from 'react'
import { findEmoji, isEmoji } from '../../helper'
import {formatDatetime} from '../../helper';

export default class Default extends React.PureComponent {
    render() {
        let { message, searchMessage } = this.props
        let role = message.messageFrom === 0 ? 'self' : 'other';
        const isHaveText = message.content && message.content.trim().split(' ').find(word => !isEmoji(word))

        return (
            <div>
                <div className={`chat-group ${role}`}>
                    <div className={`chat ${message.isError ? `faded` : ``}`}
                        title={formatDatetime(message.createdAt)}>
                        <div className="sender-name">{message.senderName}</div>
                        <span className={message.content && searchMessage &&  message.content.toLowerCase().includes(searchMessage.toLowerCase()) && `search-matching-item search-right-message`}>
                            { message.content ? message.content.trim().split(' ').map((word, idx, { length }) => {
                                const space = idx !== length - 1 ? ' ' : ''
                                if (word.startsWith(`https://`) || word.startsWith(`http://`)) {
                                    return <a key={idx} href={word} target="_blank">{word}{space}</a>
                                } else if (isEmoji(word)) {
                                    const emos = findEmoji(word)
                                    return emos.map((emo, idx) => {
                                        if (!emo) return ``
                                        const { sheet_x, sheet_y, unified } = emo
                                        const size = isHaveText ? 16 : 32
                                        return <span key={`${unified}_${idx}`}
                                            style={{
                                                backgroundImage: `url(images/emoji-${size}.png)`,
                                                width: size + 2,
                                                height: size + 2,
                                                border: 'none',
                                                display: 'inline-block',
                                                backgroundPosition: `-${sheet_x * (size + 2)}px -${sheet_y * (size + 2)}px`
                                            }}>
                                        </span>
                                    })
                                } return `${word}${space}`
                            }) : '' }
                        </span>
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
