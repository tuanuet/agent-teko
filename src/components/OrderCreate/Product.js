import React, { PureComponent } from 'react'
import Progress from './Progress'

class Product extends PureComponent {
    render() {
        const { step, changeStep, toggleShowOrderCreate } = this.props

        return <div>
            {/* Title */}
            <div className="row">
                <div className="col-12 title text-center text-uppercase font-weight-bold">Thông tin giỏ hàng</div>
                <span className="close-order-create text-danger" onClick={toggleShowOrderCreate}>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
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
                    <button type="button" className="btn btn-outline-success btn-block clickable" onClick={changeStep('customer')}>
                        Xác nhận giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    }
}

export default Product
