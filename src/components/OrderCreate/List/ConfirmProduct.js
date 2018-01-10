import React, { Component } from 'react'
import { numberWithCommas } from 'Helper'

class ConfirmProduct extends Component {
    render() {
        const { product } = this.props
        const { name, source_url: { base_image }, price, count } = product

        return <div className={`row align-items-center product-item`}>
            <div className="col-3">
                <img src={base_image} className="rounded img-fluid" />
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12 product-name mb-1">{name}</div>
                    <div className="col-5 product-price mb-1">Giá: { numberWithCommas(price) } đồng</div>
                    <div className="col-7 product-quantity mb-1">
                        <span className="pr-1">Số lượng: </span>
                        <span className="text-center">{count}</span>
                    </div>
                    <div className="col-10 product-total">
                        Thành tiền: { numberWithCommas(price * count) } đồng
                    </div>
                </div>
            </div>
        </div>
    }
}

export default ConfirmProduct
