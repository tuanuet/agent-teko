import React, {PropTypes} from 'react';

const Customer = ({customer}) => {
    return (
        <div className="customer" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false"
        aria-controls="collapseExample">

            <div className="row">
                <div className="col-md-2">
                    <img className="rounded-circle "
                    src="https://i1.wp.com/fimo.edu.vn/wp-content/uploads/2017/02/UET-logo-txt.png"/>

                </div>
                <div className="col-md-10 customer-short-info">
                    <p>{customer.name}</p>
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
