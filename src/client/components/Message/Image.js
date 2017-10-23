import React from 'react';

export default class Image extends React.Component {
    render() {
        let message = this.props.message;
        let role = message.messageFrom === 0 ? 'self' : 'other';
        return (
            <div className={role}>
                <div className="image">
                    <div className="content">
                        <img src={message.content} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}


