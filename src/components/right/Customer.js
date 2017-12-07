import React, {PropTypes} from 'react';

const Customer = ({customer, agents }) => {
    return (
        <div className="customer" data-toggle="collapse" href="#customer-info" aria-expanded={false}>

            <div className="row">
                <div className="col-md-10 customer-short-info">
                    <p>{customer.name}</p>
                    <p className="customer-more-info">{customer.fbId ? `Nhắn tin từ Facebook` : `Nhắn tin từ Livechat`}</p>
                    { customer.involveAdmins !== '[]' && <p>
                        Đã chat:
                        { [...JSON.parse(customer.involveAdmins)].map(agentId => <span key={agentId} className="involve-agent">
                            { agents.find(tmp => tmp.id === agentId) && agents.find(tmp => tmp.id === agentId).name }
                        </span>) }
                    </p> }
                </div>

            </div>
        </div>
    );
};

Customer.propTypes = {
    customer: PropTypes.object.isRequired
};

export default Customer;
