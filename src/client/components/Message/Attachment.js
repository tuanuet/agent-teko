import React from 'react';

export default class Attachment extends React.Component {
    render() {
        let message = this.props.message;
        let role = message.messageFrom === 0 ? 'self' : 'other';
        return (
            <div className={role}>
                <div className="image">
                    <div className="content">
                        <div><i class="fa fa-paperclip" aria-hidden="true"></i><a href={message.content}>{message.name}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


