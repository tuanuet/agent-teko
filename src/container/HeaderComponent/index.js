import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import { messagesFetchRequested } from '../MiddleContainer/chatActions'
import { adminChooseRoom, resetNumOfUnReadMessages } from '../LeftContainer/roomActions'
import { API_URL } from '../../constants/Server'
import { formatDatetime } from '../../helper'
import Subscription from '../../components/Middle/Subscription'

class HeaderContainer extends React.Component {

    readSubscriptions = () => {
        this.props.actions.readSubscriptions()
    }

    handleBroadcast = () => {
        if (confirm(`Xác nhận trực phòng chat?\n\nTrong thời gian trực phòng chat, admin có thể nhận tin nhắn của tất cả các khách hàng gửi tới fanpage.`)) {
            const { actions, currentAgent } = this.props

            actions.handleBroadcastRoom(currentAgent.id)
        }
    }

    handleUnbroadcast = () => {
        if (confirm(`Xác nhận thoát trực phòng chat?\n\nSau khi rời trực phòng chat, admin sẽ chỉ nhận được tin nhắn của những khách hàng mình đang quản lý.`)) {
            const { actions, currentAgent } = this.props

            actions.handleUnbroadcastRoom(currentAgent.id)
        }
    }

    clickSubscription = roomId => {
        if (!roomId) return false
        const { actions } = this.props
        actions.adminChooseRoom(roomId)
        actions.messagesFetchRequested(roomId)
        actions.resetNumOfUnReadMessages(roomId)
    }

    render() {
        const { currentAgent, rooms, subscriptions, isMobile } = this.props
        const countSubscription = subscriptions.filter(sub => !sub.markAsRead).length

        return <header className={`clearfix ${isMobile ? `is-mobile` : ``}`}>
            <div className="float-left">
                <a href={API_URL} className="clickable" style={{ marginRight: '15px', color: 'white' }} title="Quay lại trang Dashboard">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </a>
                <span title={currentAgent.role && currentAgent.role.name} className="mr-3">Xin chào, {currentAgent.name}</span>
                <span id="subscription-dropdown-menu" className="dropdown" onClick={countSubscription > 0 && this.readSubscriptions}>
                    <span id="sub-dropdown" className="clickable" data-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-bell-o"></i>
                        { countSubscription > 0 && <span className="count-subscription">{countSubscription}</span> }
                    </span>
                    <div className="dropdown-menu dropdown-subscription">
                        { subscriptions.map((sub, idx, { length }) => <Subscription
                            key={sub.id}
                            sub={sub}
                            idx={idx}
                            rooms={rooms}
                            clickSubscription={this.clickSubscription}
                            length={length}
                        /> ) }
                    </div>
                </span>
            </div>
            <div className="float-right" style={{ marginRight: `${isMobile ? `0` : `50px`}`}}>
                { currentAgent.isBroadcast == 0 && <span
                    className="clickable"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Nhận trực phòng chat"
                    onClick={this.handleBroadcast}>
                    <i className="fa fa-toggle-off" style={{marginRight: '5px'}}></i>
                    { !isMobile && `Nhận trực phòng chat` }
                </span> }
                { currentAgent.isBroadcast == 1 && <span
                    className="clickable"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Thoát trực phòng chat"
                    onClick={this.handleUnbroadcast}>
                    <i className="fa fa-toggle-on" style={{marginRight: '5px'}}></i>
                    { !isMobile && `Đang trực` }
                </span> }
            </div>
        </header>
    }
}

const mapStateToProps = state => {
    const currentRoom = state.rooms.find(room => room.roomId === state.currentRoomId)
    return {
        currentAgent: state.agent,
        currentRoom,
        rooms: state.rooms,
        subscriptions: state.subscriptions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({...actions, adminChooseRoom, messagesFetchRequested, resetNumOfUnReadMessages}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
