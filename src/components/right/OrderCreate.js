import React, { Component } from 'react'

class OrderCreate extends Component {
    handleOrderCreate = e => {
        e.preventDefault()
        this.props.toggleShowOrderCreate()
    }
    render() {
        const { toggleShowOrderCreate } = this.props
        return <div id="order-create-block">
            <p>
                <i className="fa fa-cart-plus" aria-hidden="true"></i>
                <a href="" onClick={this.handleOrderCreate}>Tạo đơn hàng cho khách hàng</a>
            </p>
        </div>
    }
}

export default OrderCreate
