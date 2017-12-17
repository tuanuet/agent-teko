import React, {PropTypes} from 'react'
import axios from 'axios'
import { ACCESS_TOKEN } from '../../constants/Server'

class CustomerFullInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditPhone: false,
            isSavingPhone: false,
            currentPhoneNumber: props.customer.phone,
            isLoadingCusInfo: false,
            cusWork: '',
            cusEducation: '',
            cusLocation: '',
            cusHomeTown: '',
            cusLink: ''
        }
    }

    loadingFacebookInfo = fbId => {
        this.setState({
            isLoadingCusInfo: true
        })
        axios.request({
            method: 'get',
            url: `${fbId}?fields=work,education,location,hometown,link`,
            baseURL: 'https://graph.facebook.com/v2.11/',
            params: {
                access_token: ACCESS_TOKEN
            }
        }).then(res => res.data).then(res => {
            const { work, education, location, hometown, link } = res

            this.setState({
                cusWork: work ? work.slice(-1).pop().employer.name : '',
                cusEducation: education ? education.slice(-1).pop().school.name : '',
                cusLocation: location ? location.name : '',
                cusHomeTown: hometown ? hometown.name : '',
                cusLink: link ? link : '',
                isLoadingCusInfo: false
            })
        }).catch(err => console.log(err))
    }

    componentWillMount = () => {
        const { customer: { fbId } } = this.props
        this.loadingFacebookInfo(fbId)
    }

    componentWillReceiveProps = nextProps => {
        const { customer: { fbId: currentFbId } } = this.props
        const { customer: { fbId: nextFbId }} = nextProps

        if (currentFbId !== nextFbId) {
            console.log('Info change', nextFbId);
            this.loadingFacebookInfo(nextFbId)
        }
    }

    checkSubmit = e => {
        if (e.keyCode === 13) {
            this.submitPhoneNumber()
        }
    }

    handlePhoneChange = e => {
        this.setState({
            currentPhoneNumber: e.target.value
        })
    }

    togglePhoneNumber = () => {
        const { customer: { phone } } = this.props

        this.setState(prevState => ({
            isEditPhone: !prevState.isEditPhone,
            isSavingPhone: false,
            currentPhoneNumber: phone
        }))
    }

    submitPhoneNumber = () => {
        const { actions, customer } = this.props
        const { currentPhoneNumber } = this.state

        if (!currentPhoneNumber) {
            this.setState({
                isEditPhone: false,
                currentPhoneNumber: customer.phone
            })
        }
        this.setState({
            isSavingPhone: true
        })
        actions.updatePhoneNumber(customer.id, currentPhoneNumber).then(res => {
            this.setState({
                isSavingPhone: false,
                isEditPhone: false,
            })
        })
    }

    render() {
        const { customer } = this.props
        const { isEditPhone, isSavingPhone, currentPhoneNumber } = this.state

        const { isLoadingCusInfo, cusLink, cusWork, cusHomeTown, cusEducation, cusLocation } = this.state

        const inputStyle = {
            marginLeft: '0.5em',
            paddingLeft: '0.5em',
        }

        return <div id="customer-info" className="customer-full-info">
            <div>
                <p>
                    <span>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        { isEditPhone
                            ? <input value={currentPhoneNumber} onChange={this.handlePhoneChange} onKeyUp={this.checkSubmit} style={inputStyle} autoFocus />
                            : <strong>{customer.phone || 'Chưa  có'}</strong> }
                    </span>
                    { isEditPhone
                        ? <span className="pull-right">
                            { isSavingPhone
                                ? <i className="fa fa-spin fa-circle-o-notch" aria-hidden="true" style={{marginRight: '0.5em'}}></i>
                                : <i className="fa fa-check clickable" onClick={this.submitPhoneNumber} style={{marginRight: '0.5em'}}></i> }
                            <i className="fa fa-times clickable" onClick={this.togglePhoneNumber}></i>
                        </span>
                        : <i className="fa fa-pencil clickable pull-right" aria-hidden="true" onClick={this.togglePhoneNumber}></i> }

                </p>
            </div>
            { !isLoadingCusInfo ? <div>
                <p>
                    <i className="fa fa-facebook-official" aria-hidden="true"></i>
                    <a href={cusLink} target="_blank">
                        Timeline của khách hàng
                    </a>
                </p>
            </div> : <div className="text-center">
                <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ color: '#2b7ec9' }}></i>
                <span className="sr-only">Loading...</span>
            </div> }
        </div>
    }

};

CustomerFullInfo.propTypes = {
    customer: PropTypes.object.isRequired
};

export default CustomerFullInfo;
