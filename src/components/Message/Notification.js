import React from 'react';

export default class Notification extends React.PureComponent {
    render() {
        return (
            <div className="notification">
               <div className="content">{this.props.content}</div>
            </div>
        );
    }
}
