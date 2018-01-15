import React, { PureComponent } from 'react'
import { numberWithCommas, checkSpecialPrice, getCorrectPrice } from 'Helper'
import { TEKSHOP_URL } from 'Constants/Server'

const validateCount = count => {
    if (count < 1) return 1
    if (count > 500) return 500
    return parseInt(count)
}

class OrderProduct extends PureComponent {
    changeOrderCount = e => {
        e.preventDefault()
        const digitRegex = /^\d+$/
        if (!e.target.value.match(digitRegex)) return false
        const { product: { id, count }, actions } = this.props
        actions.changeOrderCount(id, validateCount(e.target.value))
    }
    decreaseCount = () => {
        const { product: { id, count }, actions } = this.props
        actions.changeOrderCount(id, validateCount(count - 1))
    }
    increaseCount = () => {
        const { product: { id, count }, actions } = this.props
        actions.changeOrderCount(id, validateCount(count + 1))
    }
    handleUpDownKey = e => {
        let mutiplier = 1
        if (e.shiftKey) mutiplier *= 10
        if (e.ctrlKey) mutiplier *= 100

        if (e.keyCode === 38) {
            e.preventDefault()
            const { product: { id, count }, actions } = this.props
            actions.changeOrderCount(id, validateCount(count + mutiplier))
        } else if (e.keyCode === 40) {
            e.preventDefault()
            const { product: { id, count }, actions } = this.props
            actions.changeOrderCount(id, validateCount(count - mutiplier))
        }
    }
    removeOrderProduct = () => {
        const { product: { id }, actions } = this.props
        actions.removeOrderProduct(id)
    }
    stopPropagation = e => {
        e.stopPropagation()
    }
    render() {
        const { product } = this.props
        const { name, source_url: { base_image }, price, count, attributes: { url_path, special_price } } = product
        const isSpecialPrice = checkSpecialPrice(product)

        return <div className={`row align-items-center product-item`}>
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
                        <button className="btn btn-sm btn-info clickable" disabled={count === 1} onClick={this.decreaseCount}>-</button>
                        <input className="text-center" value={count} onChange={this.changeOrderCount} onKeyDown={this.handleUpDownKey} />
                        <button className="btn btn-sm btn-info clickable" disabled={count === 500} onClick={this.increaseCount}>+</button>
                    </div>
                    <div className="col-10 product-total">
                        Thành tiền: { numberWithCommas(getCorrectPrice(product) * count) } đồng
                    </div>
                </div>
            </div>
            <div className="remove-product text-danger clickable" onClick={this.removeOrderProduct}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
            { url_path && <a className="popup-link" href={`${TEKSHOP_URL}/game/${url_path}`} target="_blank" onClick={this.stopPropagation}>
                <i className="fa fa-external-link" aria-hidden="true"></i>
            </a> }
        </div>
    }
}

export default OrderProduct
