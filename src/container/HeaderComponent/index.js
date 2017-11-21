import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'

class HeaderContainer extends React.Component {

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

    render() {
        const { currentAgent } = this.props
        return <header className="clearfix">
            <div className="float-left">
                Xin chào, {currentAgent.name}
            </div>
            <div className="float-right" style={{ marginRight: '50px'}}>
                { currentAgent.isBroadcast == 0 && <span
                    className="clickable"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Nhận trực phòng chat"
                    onClick={this.handleBroadcast}>
                    <i className="fa fa-volume-control-phone" style={{marginRight: '5px'}}></i>
                    Nhận trực phòng chat
                </span> }
                { currentAgent.isBroadcast == 1 && <span
                    className="clickable"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Thoát trực phòng chat"
                    onClick={this.handleUnbroadcast}>
                    <i className="fa fa-volume-control-phone" style={{marginRight: '5px'}}></i>
                    Đang trực
                </span> }
            </div>
        </header>
    }
}

const mapStateToProps = state => {
    return {
        currentAgent: state.agent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({...actions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
