import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderCreate from '../../components/OrderCreate/OrderCreate'

class OrderCreateContainer extends Component {
    render() {
        return <OrderCreate {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreateContainer)
