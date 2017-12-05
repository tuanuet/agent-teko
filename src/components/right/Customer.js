import React, {PropTypes} from 'react';

const Customer = ({customer}) => {
    return (
        <div className="customer" data-toggle="collapse" href="#customer-info" aria-expanded={false}>

            <div className="row">
                <div className="col-md-10 customer-short-info">
                    <p>{customer.name}</p>
                    <p>{customer.fbId ? `Khách hàng nhắn tin từ Facebook` : `Khách hàng nhắn tin từ Livechat`}</p>
                </div>

            </div>
        </div>
    );
};

Customer.propTypes = {
    customer: PropTypes.object.isRequired
};

export default Customer;
