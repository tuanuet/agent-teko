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
        const { agent: { code }} = props
        const { order: { customer }} = props
        const { customer: { name: customerName, phone: customerPhone } } = props
        const { name, phone, city, county, address, email, note, isGetBill, company, taxNumber, addressOnBill, addressReceiveBill} = customer
        this.state = {
            affiliateCode: code || '',
            name: name || customerName || '',
            phone: phone || customerPhone || '',
            city: city || '',
            county: county || '',
            address: address || '',
            email: email || '',
            note: note || '',
            isGetBill: isGetBill || false,
            company: company || '',
            taxNumber: taxNumber || '',
            addressOnBill: addressOnBill || '',
            addressReceiveBill: addressReceiveBill || '',
            error: '',
            isChangeAffiliate: false
        }
    }
    goPrevious = () => {
        this.props.changeStep('product')
    }
    updateFormChange = e => {
        const target = e.target
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value

        this.setState(prevState => ({
            [name]: value,
            county: name === 'city' ? '' : name === 'county' ? value : prevState.county
        }), () => {
            // Reset bill address on city and county changed
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
    checkVerifiedData = () => {
        const { name, phone, city, county, address, isGetBill } = this.state
        const { company, taxNumber, addressOnBill, addressReceiveBill } = this.state
        const { changeStep, actions } = this.props

        const validateGeneral = name && /[0-9]+/.test(phone) && city && county && address
        const validateBill = isGetBill ? (company && taxNumber && addressOnBill && addressReceiveBill) : true

        if (validateGeneral && validateBill) return true
        else return false
    }
    verifyChangeStep = () => {
        const { affiliateCode, name, phone, city, county, address, isGetBill, email, note } = this.state
        const { company, taxNumber, addressOnBill, addressReceiveBill } = this.state
        const { changeStep, actions } = this.props

        const isValid = this.checkVerifiedData()

        if (isValid) {
            let customer = {
                affiliateCode, name, phone, city, county, address, isGetBill, email, note
            }
            if (isGetBill) customer = {
                ...customer,
                isGetBill, company, taxNumber, addressOnBill, addressReceiveBill
            }
            actions.addOrderCustomerInfo(customer)
            changeStep('confirm')
        } else this.setState({
            error: 'Thông tin giao hàng chưa đầy đủ. Vui lòng điền thêm thông tin.'
        })
    }
    toggleChangeAffiliate = () => {
        this.setState(prevState => ({
            isChangeAffiliate: !prevState.isChangeAffiliate
        }))
    }
    cancelAffiliate = () => {
        const { agent: { code } } = this.props
        this.setState(prevState => ({
            affiliateCode: code,
            isChangeAffiliate: !prevState.isChangeAffiliate
        }))
    }
    render() {
        const { affiliateCode, name, phone, city, county, address, email, note, isGetBill, company, taxNumber, addressOnBill, addressReceiveBill, error, isChangeAffiliate } = this.state
        const { step, toggleShowOrderCreate } = this.props

        const validFormGroup = (value, type = null) => {
            if (!error) return ''
            if (type === 'phone') {
                if (/[0-9]+/.test(value)) return 'has-success'
                return 'has-danger'
            }
            if (value) return 'has-success'
            return 'has-danger'
        }

        const validInput = (value, type = null) => {
            if (!error) return ''
            if (type === 'phone') {
                if (/[0-9]+/.test(value)) return 'form-control-success'
                return 'form-control-danger'
            }
            if (value) return 'form-control-success'
            return 'form-control-danger'
        }

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
                    <div className="form-group row affiliate">
                        <label className="form-label col-sm-4">Mã giới thiệu</label>
                        <div className="col-sm-6">
                            { !isChangeAffiliate ? affiliateCode : <input type="text" value={affiliateCode} name="affiliateCode" className="form-control form-control-sm" onChange={this.updateFormChange} autoFocus /> }
                        </div>
                        <div className="col-2">
                            { isChangeAffiliate ? <div className="float-right">
                                <i className="fa fa-check clickable pr-2" aria-hidden="true" onClick={this.toggleChangeAffiliate}></i>
                                <i className="fa fa-times clickable" aria-hidden="true" onClick={this.cancelAffiliate}></i>
                            </div> : <i className="fa fa-pencil clickable float-right" aria-hidden="true" onClick={this.toggleChangeAffiliate}></i> }
                        </div>
                    </div>
                    <div className={`form-group ${validFormGroup(name)}`}>
                        <label className="form-label required">Họ tên</label>
                        <input type="text" value={name} name="name" className={`form-control form-control-sm ${validInput(name)}`} onChange={this.updateFormChange} autoFocus />
                    </div>
                    <div className={`form-group ${validFormGroup(phone, 'phone')}`}>
                        <label className="form-label required">Điện thoại di động</label>
                        <input type="text" value={phone} name="phone" className={`form-control form-control-sm ${validInput(phone, 'phone')}`} onChange={this.updateFormChange} />
                    </div>
                    <div className={`form-group ${validFormGroup(city)}`}>
                        <label className="form-label required">Tỉnh / Thành phố</label>
                        <select value={city} name="city" className={`form-control form-control-sm ${validInput(city)}`} onChange={this.updateFormChange}>
                            <option value={''}></option>
                            { cities.sort(sortCities).map(city => {
                                const { region_id, default_name } = city
                                return <option key={region_id} value={region_id}>{default_name}</option>
                            }) }
                        </select>
                    </div>
                    <div className={`form-group ${validFormGroup(county)}`}>
                        <label className="form-label required">Quận / Huyện</label>
                        <select value={county} name="county" className={`form-control form-control-sm ${validInput(county)}`} onChange={this.updateFormChange}>
                            <option value={''}></option>
                            { city && counties.filter(county => county.region_id == city).map(county => {
                                const { city_id, name } = county
                                return <option key={city_id} value={city_id}>{name}</option>
                            }) }
                        </select>
                    </div>
                    <div className={`form-group ${validFormGroup(address)}`}>
                        <label className="form-label required">Địa chỉ</label>
                        <textarea type="text" value={address} name="address" rows="2" className={`form-control form-control-sm ${validInput(address)}`} onChange={this.updateFormChange} />
                    </div>
                    <div className={`form-group`}>
                        <label className="form-label">Địa chỉ Email</label>
                        <input type="text" value={email} name="email" className="form-control form-control-sm" onChange={this.updateFormChange} />
                    </div>
                    <div className={`form-group`}>
                        <label className="form-label">Ghi chú</label>
                        <textarea type="text" value={note} name="note" rows="3" className="form-control form-control-sm" onChange={this.updateFormChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="get-bill-checkbox" className="form-label col-sm-5 clickable">Yêu cầu viết hóa đơn</label>
                        <div className="col-sm-5">
                            <input id="get-bill-checkbox" type="checkbox" checked={isGetBill} name="isGetBill" className="form-check-input form-control float-left clickable" onChange={this.updateFormChange} />
                        </div>
                    </div>
                    { isGetBill && <div>
                        <div className={`form-group ${validFormGroup(company)}`}>
                            <label className="form-label required">Tên công ty</label>
                            <input type="text" value={company} name="company" className={`form-control form-control-sm ${validInput(company)}`} onChange={this.updateFormChange} />
                        </div>
                        <div className={`form-group ${validFormGroup(taxNumber)}`}>
                            <label className="form-label required">Mã số thuế</label>
                            <input type="text" value={taxNumber} name="taxNumber" className={`form-control form-control-sm ${validInput(taxNumber)}`} onChange={this.updateFormChange} />
                        </div>
                        <div className={`form-group ${validFormGroup(addressOnBill)}`}>
                            <label className="form-label required">Địa chỉ trên hóa đơn</label>
                            <textarea type="text" value={addressOnBill} name="addressOnBill" rows="3" className={`form-control form-control-sm ${validInput(addressOnBill)}`} onChange={this.updateFormChange} />
                        </div>
                        <div className={`form-group ${validFormGroup(addressReceiveBill)}`}>
                            <label className="form-label required">Địa chỉ nhận hóa đơn</label>
                            <textarea type="text" value={addressReceiveBill} name="addressReceiveBill" rows="3" className={`form-control form-control-sm ${validInput(addressReceiveBill)}`} onChange={this.updateFormChange} />
                        </div>
                    </div> }
                </div>
            </div>
            <div className="bottom-align">
                { error && <div className="col-12 text-center text-danger error-text">
                    <i className="fa fa-exclamation-triangle pr-2" aria-hidden="true"></i>
                    { error }
                </div> }
                <div className="col-12">
                    <button type="button" className="btn btn-outline-warning btn-block clickable" onClick={this.verifyChangeStep}>
                        Xác nhận thông tin giao hàng
                    </button>
                </div>
            </div>
        </div>
    }
}

export default Customer
