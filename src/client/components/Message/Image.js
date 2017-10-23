import React from 'react';

export default class Image extends React.Component {
    render() {
        let message = this.props.message;
        let role = message.messageFrom === 1 ? 'self' : 'other';
        return (
            <li className={role}>
                <div className="image">
                    <div className="content">
                        <img src={message.content} alt=""/>
                        <time>{message.createdAt}</time>
                    </div>
                </div>
            </li>
        );
    }
}


