import React, {PropTypes} from 'react';

class CustomerFullInfo extends React.Component {
    render() {
        const { customer } = this.props

        return <div className="customer-full-info" id="collapseCustomerInfo">
            <div>
                <p><i className="fa fa-user" aria-hidden="true"></i><strong>{customer.name}</strong></p>
            </div>
            <div>
                <p><i className="fa fa-phone" aria-hidden="true"></i><strong>{customer.phone || 'Chưa  có'}</strong></p>
            </div>
            {/* <div>
                <p><i className="fa fa-envelope-o" aria-hidden="true"></i><strong>{customer.email || 'Chưa  có'}</strong></p>
            </div> */}
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
