import React, { Component } from 'react'
import Product from './Product'
import Customer from './Customer'
import Confirm from './Confirm'

class OrderCreateComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 'product' // <product|customer|confirm>
        }
    }
    changeStep = step => e => {
        this.setState({
            step
        })
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
        const { isShowOrderCreate } = this.props
        const content = () => {
            if (step === 'product')
                return <Product step={step}
                    changeStep={this.changeStep}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
            else if (step === 'customer')
                return <Customer step={step}
                    changeStep={this.changeStep}
                    toggleShowOrderCreate={this.toggleShowOrderCreate} />
            else if (step === 'confirm')
                return <Confirm step={step}
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
