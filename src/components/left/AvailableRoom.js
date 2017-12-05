import React, {PropTypes} from 'react'
import moment from 'moment'
import _ from 'lodash'
import * as helper from '../../helper'

class AvailableRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            oldestCustomerMessage: 0
        }
    }

    updateOldestCustomerMessage = () => {
        const { availableRoom } = this.props
        if (!availableRoom.roomInfo) return false
        const { latestMessage } = availableRoom.roomInfo
        const { oldestCustomerMessage } = this.state

        if (latestMessage && latestMessage.messageFrom === 1 && oldestCustomerMessage === 0) {
            this.setState({
                oldestCustomerMessage: moment(latestMessage.createdAt)
            })
        } else if (latestMessage && latestMessage.messageFrom === 0 && oldestCustomerMessage !== 0) {
            this.setState({
                oldestCustomerMessage: 0
            })
        }
    }

    componentDidMount() {
        this.updateOldestCustomerMessage()
    }

    componentDidUpdate() {
        this.updateOldestCustomerMessage()
    }

    render() {
        const { oldestCustomerMessage } = this.state
        const { availableRoom, adminChooseRoom, currentRoomId } = this.props

        let className = "room-item"
        if (availableRoom.roomInfo && availableRoom.roomInfo.numOfUnReadMessages > 0) {
            className += " unread"
        }

        if (availableRoom.roomId === currentRoomId) {
            className += " active"
        }

        return (
            <div className={className} onClick={adminChooseRoom.bind(this, availableRoom.roomId)} >
                <div className="customer-control">
                    <img
                        src={availableRoom.customer.avatarUrl}
                    className="avatar" alt="image"/>
                </div>
                <div className="customer-info">
                    <div className="title">
                        <div className="name">{availableRoom.customer.name}</div>
                        <div className="timer">
                            <span>{availableRoom.roomInfo && availableRoom.roomInfo.latestMessage && helper.formatDatetime(availableRoom.roomInfo.latestMessage.createdAt)}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="last-massage">
                            {availableRoom.roomInfo && availableRoom.roomInfo.latestMessage && helper.formatLatestMessage(availableRoom.roomInfo.latestMessage)}
                        </div>
                        { availableRoom.roomInfo && availableRoom.roomInfo.numOfUnReadMessages > 0 && <div className="numUnread">{availableRoom.roomInfo.numOfUnReadMessages}</div> }
                    </div>
                    { availableRoom.tags && <div className="tags-of-room">
                        { availableRoom.tags.map(tag => <span key={tag.id} className="tag" style={{ backgroundColor: `${tag.color}`}}>
                            { tag.title }
                        </span> ) }
                    </div> }
                    { oldestCustomerMessage !== 0 && moment().diff(moment(oldestCustomerMessage), 'minutes') > 5 && <div className="warning-timer">
                        <i className="fa fa-exclamation-triangle" aria-hidden="true" style={{marginRight: 3}}></i>
                        Chưa trả lời trong { moment(oldestCustomerMessage).fromNow(true) }
                    </div> }
                </div>
            </div>
        )
    }
}

AvailableRoom.propTypes = {
    availableRoom: PropTypes.object.isRequired,
    adminChooseRoom: PropTypes.func.isRequired
}

export default AvailableRoom
