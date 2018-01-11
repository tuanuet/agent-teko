import React, { Component } from 'react'
import Progress from './Progress'
import ConfirmProduct from './List/ConfirmProduct'
import cities from 'Constants/cities'
import counties from 'Constants/counties'
import { numberWithCommas, getCreateOrderData } from 'Helper'

class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingRequest: false,
            error: ''
        }
    }
    goPrevious = () => {
        this.props.changeStep('customer')
    }
    sendCreateOrder = () => {
        const { order: { customer, orderProducts } } = this.props

        this.setState({
            isLoadingRequest: true
        }, () => {
            const data = getCreateOrderData(customer, orderProducts)
            console.log(data);
        })
    }
    render() {
        const { isLoadingRequest } = this.state
        const { step, changeStep, toggleShowOrderCreate, order } = this.props
        const { customer, orderProducts } = order
        const { name, phone, address, city, county, note } = customer
        const cityName = cities.find(tmp => tmp.region_id == city).default_name
        const countyName = counties.find(tmp => tmp.city_id == county).name

        let totalPrice = 0
        orderProducts.forEach(product => {
            const { price, count } = product
            totalPrice += price * count
        })

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
            {/* Show order information */}
            <div className="row confirm-order-block">
                <div className="col-12 p-3">
                    <div className="p-3">
                        <div className="block-title">
                            Thông tin giao hàng
                        </div>
                        <div className="customer-info-block pb-4">
                            <div className="row">
                                <span className="col-3 label">Họ tên</span>
                                <span className="col-9">{name}</span>
                            </div>
                            <div className="row">
                                <span className="col-3 label">Địa chỉ</span>
                                <span className="col-9">{ [address, cityName, countyName].join(', ') }</span>
                            </div>
                            <div className="row">
                                <span className="col-3 label">Điện thoại</span>
                                <span className="col-9">{phone}</span>
                            </div>
                            <div className="row">
                                <span className="col-3 label">Ghi chú</span>
                                <span className="col-9">{note}</span>
                            </div>
                        </div>
                        <div className="block-title">
                            Thông tin giỏ hàng
                        </div>
                        <div className="order-info-block pb-4">
                            { orderProducts.map(product => {
                                return <ConfirmProduct key={product.id} product={product} />
                            }) }
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-align">
                { orderProducts.length > 0 && <div className="col-12 total-price text-center">
                    Tổng giá trị đơn hàng: { numberWithCommas(totalPrice) } đồng
                </div> }
                <div className="col-12">
                    <button type="button"
                        className="btn btn-outline-warning btn-block clickable next-step-button"
                        onDoubleClick={this.sendCreateOrder}
                        disabled={isLoadingRequest}>
                        { isLoadingRequest && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> }
                        { isLoadingRequest ? `Đang xử lý yêu cầu` : `Ấn đúp để xác nhận đơn hàng và đặt đơn` }
                    </button>
                </div>
            </div>
        </div>
    }
}

export default Confirm
