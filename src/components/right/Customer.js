import React, {PropTypes} from 'react';

const Customer = ({customer}) => {
    return (
        <div className="customer" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true"
        aria-controls="collapseExample">

            <div className="row">
                <div className="col-md-10 customer-short-info">
                    <p>{customer.name} {customer.fbId && `(FB user)`}</p>
                    <p>{customer.phone}</p>
                </div>

            </div>
        </div>
    );
};

Customer.propTypes = {
    customer: PropTypes.object.isRequired
};

export default Customer;
