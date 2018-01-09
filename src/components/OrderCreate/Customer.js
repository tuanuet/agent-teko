import React, { Component } from 'react'
import Progress from './Progress'
import cities from 'Constants/cities'
import counties from 'Constants/counties'

const sortCities = (a, b) => {
    if (a.default_name === 'Hà Nội') return -1
    if (b.default_name === 'Hà Nội') return 1
    if (a.default_name === 'Tp. Hồ Chí Minh') return -1
    if (b.default_name === 'Tp. Hồ Chí Minh') return 1
    if (a.default_name === 'Đà Nẵng') return -1
    if (b.default_name === 'Đà Nẵng') return 1

    if (a.default_name < b.default_name) return -1
    else if (a.default_name > b.default_name) return 1

    return 0
}

class Customer extends Component {
    constructor(props) {
        super(props)
        const { customer: { name, phone } } = props
        this.state = {
            name: name && '',
            phone: phone && '',
            city: '',
            county: '',
            address: '',
            email: '',
            note: '',
            checkValidate: false,
            isGetBill: false,
            company: '',
            taxNumber: '',
            addressOnBill: '',
            addressReceiveBill: ''
        }
    }
    goPrevious = () => {
        this.props.changeStep('product')
    }
    updateFormChange = e => {
        const target = e.target
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value

        this.setState({
            [name]: value
        }, () => {
            const { isGetBill, city, county } = this.state
            if (!isGetBill && (name === 'city' || name === 'county')) {
                const currentCity = cities.find(tmp => tmp.region_id == city)
                const currentCounty = counties.find(tmp => tmp.city_id == county)
                const cityName = currentCity ? currentCity.default_name : ''
                const countyName = currentCounty ? currentCounty.name : ''
                const address = `\n${countyName}\n${cityName}`
                this.setState({
                    addressOnBill: address,
                    addressReceiveBill: address
                })
            }
        })
    }
    render() {
        const { name, phone, city, county, address, email, note, isGetBill, company, taxNumber, addressOnBill, addressReceiveBill } = this.state
        const { step, toggleShowOrderCreate } = this.props

        return <div>
            {/* Title */}
            <div className="row">
                <span className="go-previous" onClick={this.goPrevious}>← Quay lại</span>
                <div className="col-12 title text-center text-uppercase font-weight-bold">Thông tin giao hàng</div>
                <span className="close-order-create text-danger" onClick={toggleShowOrderCreate}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
            {/* Progress */}
            <Progress step={step} />
            {/* Customer's info */}
            <div className="row">
                <div className="col-10 offset-1 customer-block">
                    <div className="form-group">
                        <label className="form-label required">Họ tên</label>
                        <input type="text" value={name} name="name" className="form-control form-control-sm" onChange={this.updateFormChange} autoFocus />
                    </div>
                    <div className="form-group">
                        <label className="form-label required">Điện thoại di động</label>
                        <input type="text" value={phone} name="phone" className="form-control form-control-sm" onChange={this.updateFormChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label required">Tỉnh / Thành phố</label>
                        <select value={city} name="city" className="form-control form-control-sm" onChange={this.updateFormChange}>
                            <option value={''}></option>
                            { cities.sort(sortCities).map(city => {
                                const { region_id, default_name } = city
                                return <option key={region_id} value={region_id}>{default_name}</option>
                            }) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label required">Quận / Huyện</label>
                        <select value={county} name="county" className="form-control form-control-sm" onChange={this.updateFormChange}>
                            <option value={''}></option>
                            { city && counties.filter(county => county.region_id == city).map(county => {
                                const { city_id, name } = county
                                return <option key={city_id} value={city_id}>{name}</option>
                            }) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label required">Địa chỉ</label>
                        <textarea type="text" value={address} name="address" rows="2" className="form-control form-control-sm" onChange={this.updateFormChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Địa chỉ Email</label>
                        <input type="text" value={email} name="email" className="form-control form-control-sm" onChange={this.updateFormChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Ghi chú</label>
                        <textarea type="text" value={note} name="note" rows="3" className="form-control form-control-sm" onChange={this.updateFormChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="get-bill-checkbox" className="form-label col-sm-5 clickable">Yêu cầu viết hóa đơn</label>
                        <div className="col-sm-5">
                            <input id="get-bill-checkbox" type="checkbox" checked={isGetBill} name="isGetBill" className="form-check-input" onChange={this.updateFormChange} />
                        </div>
                    </div>
                    { isGetBill && <div>
                        <div className="form-group">
                            <label className="form-label required">Tên công ty</label>
                            <input type="text" value={company} name="company" className="form-control form-control-sm" onChange={this.updateFormChange} autoFocus />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">Mã số thuế</label>
                            <input type="text" value={taxNumber} name="taxNumber" className="form-control form-control-sm" onChange={this.updateFormChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">Địa chỉ trên hóa đơn</label>
                            <textarea type="text" value={addressOnBill} name="addressOnBill" rows="3" className="form-control form-control-sm" onChange={this.updateFormChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">Địa chỉ nhận hóa đơn</label>
                            <textarea type="text" value={addressReceiveBill} name="addressReceiveBill" rows="3" className="form-control form-control-sm" onChange={this.updateFormChange} />
                        </div>
                    </div> }
                </div>
            </div>
            <div className="bottom-align">
                <div className="col-12">
                    <button type="button" className="btn btn-outline-info btn-block clickable">
                        Xác nhận thông tin giao hàng
                    </button>
                </div>
            </div>
        </div>
    }
}

export default Customer
