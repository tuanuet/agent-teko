import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import OrderCreate from 'Components/OrderCreate/OrderCreate'
import * as orderActions from 'Actions/orderActions'

class OrderCreateContainer extends Component {
    render() {
        const { customer } = this.props
        if (!customer) return false
        return <OrderCreate {...this.props} />
    }
}

const mapStateToProps = state => {
    const { order, currentRoomId, rooms, agent } = state
    const currentRoom = rooms.find(room => room.roomId === currentRoomId)
    const customer = currentRoom ? currentRoom.customer : null
    return { order, customer, agent }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({...orderActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateContainer)
