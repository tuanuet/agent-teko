import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import OrderCreate from 'Components/OrderCreate/OrderCreate'
import * as orderActions from 'Actions/orderActions'

class OrderCreateContainer extends Component {
    render() {
        return <OrderCreate {...this.props} />
    }
}

const mapStateToProps = state => {
    const { order } = state
    return { order }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({...orderActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateContainer)
