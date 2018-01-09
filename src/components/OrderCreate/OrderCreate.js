import React, { Component } from 'react'
import Product from './Product'
import Customer from './Customer'
import Confirm from './Confirm'

class OrderCreateComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 'customer' // <product|customer|confirm>
        }
    }
    changeStep = step => {
        this.setState({ step })
    }
    toggleShowOrderCreate = () => {
        // Reset state
        this.setState({
            step: 'product'
        })
        // Toggle close
        this.props.toggleShowOrderCreate()
    }
    render() {
        const { step } = this.state
        const { isShowOrderCreate, actions, order, customer } = this.props
        const content = () => {
            if (step === 'product')
                return <Product step={step}
                    order={order}
                    actions={actions}
                    changeStep={this.changeStep}
                    isShowOrderCreate={isShowOrderCreate}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
            else if (step === 'customer')
                return <Customer step={step}
                    order={order}
                    customer={customer}
                    changeStep={this.changeStep}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
            else if (step === 'confirm')
                return <Confirm step={step}
                    order={order}
                    changeStep={this.changeStep}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
            else return false
        }
        return <div className={`order-create-container show-order-create ${isShowOrderCreate ? `show` : ``}`}>
            { content() }
        </div>
    }
}

export default OrderCreateComponent
