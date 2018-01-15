import React, { Component } from 'react'
import Progress from './Progress'
import ConfirmProduct from './List/ConfirmProduct'
import cities from 'Constants/cities'
import counties from 'Constants/counties'
import { numberWithCommas, getCreateOrderData, getCorrectPrice } from 'Helper'

class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingRequest: false,
            error: '',
            orderInfo: null
        }
    }
    goPrevious = () => {
        this.props.changeStep('customer')
    }
    sendCreateOrder = () => {
        const { agent, customer: currentCustomer, order: { customer, orderProducts }, actions } = this.props

        this.setState({
            isLoadingRequest: true
        }, () => {
            const data = getCreateOrderData(customer, orderProducts, agent)
            const { status, err } = data
            if (!status) {
                this.setState({
                    error: err,
                    isLoadingRequest: false
                })
            } else {
                actions.createOrder({...data, status: undefined, additionInfo: { adminId: agent.id, customerId: currentCustomer.id}}).then(res => {
                    const { status, orderInfo, err } = res
                    if (!status) {
                        this.setState({
                            error: err,
                            isLoadingRequest: false
                        })
                    } else {
                        this.setState({
                            orderInfo,
                            isLoadingRequest: false
                        })
                    }
                })
            }
        })
    }
    render() {
        const { isLoadingRequest, error, orderInfo } = this.state
        const { step, changeStep, toggleShowOrderCreate, order } = this.props
        const { customer, orderProducts } = order
        const { name, phone, address, city, county, note } = customer
        const cityName = cities.find(tmp => tmp.region_id == city).default_name
        const countyName = counties.find(tmp => tmp.city_id == county).name

        let totalPrice = 0
        orderProducts.forEach(product => {
            const { price, count } = product
            totalPrice += getCorrectPrice(product) * count
        })

        return <div>
            {/* Title */}
            <div className="row">
                { !orderInfo || !error && <span className="go-previous" onClick={this.goPrevious}>← Quay lại</span> }
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
                                <span className="col-9">{ [address.trim(), cityName, countyName].join(', ') }</span>
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
                    { error === '' && orderInfo === null ? <button type="button"
                        className="btn btn-outline-warning btn-block clickable next-step-button"
                        onDoubleClick={this.sendCreateOrder}
                        disabled={isLoadingRequest}>
                        { isLoadingRequest && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> }
                        { isLoadingRequest ? `Đang xử lý yêu cầu` : `Ấn đúp để xác nhận đơn hàng và đặt đơn` }
                    </button> : orderInfo ? <button type="button"
                        className="btn btn-success btn-block clickable next-step-button">
                        <i className="fa fa-check" aria-hidden="true" style={{userSelect: 'text'}}></i>
                        Tạo đơn thành công. Mã đơn: {orderInfo.increment_id}
                    </button> : <button type="button"
                        className="btn btn-danger btn-block clickable next-step-button">
                        <i className="fa fa-times" aria-hidden="true"></i>
                        Tạo đơn không thành công: "{error}"
                    </button> }
                </div>
            </div>
        </div>
    }
}

export default Confirm
