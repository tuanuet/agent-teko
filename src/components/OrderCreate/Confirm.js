import React, { Component } from 'react'
import Progress from './Progress'

class Confirm extends Component {
    goPrevious = () => {
        this.props.changeStep('customer')
    }
    render() {
        const { step, changeStep, toggleShowOrderCreate } = this.props

        return <div>
            {/* Title */}
            <div className="row">
                <span className="go-previous" onClick={this.goPrevious}>← Quay lại</span>
                <div className="col-12 title text-center text-uppercase font-weight-bold">Kiểm tra đơn hàng</div>
                <span className="close-order-create text-danger" onClick={toggleShowOrderCreate}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
            {/* Progress */}
            <Progress step={step} />
            {/* Search products */}
            <div className="row">
                <div className="col-12"></div>
            </div>
            {/* Show all products */}
            <div className="row">
                <div className="col-12"></div>
            </div>
            <div className="bottom-align">
                <div className="col-12">
                    <button type="button" className="btn btn-outline-info btn-block clickable">
                        Xác nhận đơn hàng và Đặt đơn
                    </button>
                </div>
            </div>
        </div>
    }
}

export default Confirm
