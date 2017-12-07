import React, {PropTypes} from 'react'

class CustomerFullInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditPhone: false,
            isSavingPhone: false,
            currentPhoneNumber: props.customer.phone
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

        const inputStyle = {
            marginLeft: '0.5em',
            paddingLeft: '0.5em',
        }

        return <div id="customer-info" className="customer-full-info">
            {/* <div>
                <p><i className="fa fa-user" aria-hidden="true"></i><strong>{customer.name}</strong></p>
            </div> */}
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
            { customer.fbId && <div>
                <p>
                    <i className="fa fa-facebook-official" aria-hidden="true"></i>
                    <a href={`https://www.facebook.com/${customer.email.slice(0, -('@facebook.com'.length))}`} target="_blank">
                        Timeline của khách hàng
                    </a>
                </p>
            </div> }
        </div>
    }

};

CustomerFullInfo.propTypes = {
    customer: PropTypes.object.isRequired
};

export default CustomerFullInfo;
