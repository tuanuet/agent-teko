import React, { PureComponent } from 'react'
import { numberWithCommas } from 'Helper'

class SearchProduct extends PureComponent {
    handleKeyEvent = e => {
        if (e.keyCode === 13) {
            const { product } = this.props
            this.props.addProductToOrder(product)
        } else if (e.keyCode === 38) {
            if (e.target.previousSibling) e.target.previousSibling.focus()
        } else if (e.keyCode === 40) {
            if (e.target.nextSibling) e.target.nextSibling.focus()
        }
    }
    addProductToOrder = () => {
        const { product } = this.props
        this.props.addProductToOrder(product)
    }
    render() {
        const { product } = this.props
        const { name, instock_status, source_url: { base_image }, price } = product

        return <div className={`row align-items-center clickable product-item ${instock_status ? `` : `disabled`}`} onClick={this.addProductToOrder} tabIndex={0} onKeyDown={this.handleKeyEvent}>
            <div className="col-3">
                <img src={base_image} className="rounded img-fluid" />
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-12 product-name mb-1">{name}</div>
                    <div className="col-8 product-price mb-1">Giá: {numberWithCommas(price)} đồng</div>
                    { !instock_status && <div className="col-4 product-out-stock">
                        <button className="btn btn-sm btn-warning float-right">Hết hàng</button>
                    </div> }
                </div>
            </div>
        </div>
    }
}

export default SearchProduct
