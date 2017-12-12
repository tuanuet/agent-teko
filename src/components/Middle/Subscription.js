import React, { Component } from 'react'
import { formatDatetime } from '../../helper'


class Subscription extends Component {
    clickSubscription = () => {
        const { sub } = this.props
        this.props.clickSubscription(sub.roomId)
    }
    render() {
        const { sub, idx, length } = this.props
        return <span onClick={this.clickSubscription}>
            <span className={`dropdown-item clickable ${!sub.markAsRead && `unread-subscription`}`} title={formatDatetime(sub.createdAt)}>
                <div className="title-text">{sub.title}</div>
                <div className="body-text">{sub.body}</div>
                <div className="body-text">{sub.createdAt}</div>
            </span>
            { idx !== length - 1 && <div className="dropdown-divider"></div> }
        </span>
    }
}

export default Subscription