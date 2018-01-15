import React, { Component } from 'react'
import { numberWithCommas, checkSpecialPrice, getCorrectPrice } from 'Helper'

class ConfirmProduct extends Component {
    render() {
        const { product } = this.props
        const { name, source_url: { base_image }, price, count, attributes: { special_price } } = product
        const isSpecialPrice = checkSpecialPrice(product)

        return <div className={`row align-items-center product-item pb-3`}>
            <div className="col-3">
                <img src={base_image} className="rounded img-fluid" />
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12 product-name mb-1">{name}</div>
                    <div className="col-6 product-price mb-1">Giá: { isSpecialPrice ? <span>
                        <span className="older-price pr-1">{ numberWithCommas(price) }</span>
                        <span>{ numberWithCommas(special_price) }</span>
                    </span> : numberWithCommas(price) } đồng</div>
                    <div className="col-6 product-quantity mb-1">
                        <span className="pr-1">Số lượng: </span>
                        <span className="text-center">{count}</span>
                    </div>
                    <div className="col-10 product-total">
                        Thành tiền: { numberWithCommas(getCorrectPrice(product) * count) } đồng
                    </div>
                </div>
            </div>
        </div>
    }
}

export default ConfirmProduct
