import React, {PropTypes} from 'react';

const CustomerFullInfo = ({customer}) => {
    if (customer.historyChat == undefined) {
        customer.historyChat = [];
    }
    return (
        <div className="customer-full-info" id="collapseExample">

            <div>
                <p><i className="fa fa-user" aria-hidden="true"></i><strong>{customer.customerName}</strong></p>
            </div>
            <div>
                <p><i className="fa fa-phone" aria-hidden="true"></i><strong>{customer.customerPhone}</strong></p>
            </div>
            <div>
                <p><i className="fa fa-home" aria-hidden="true"></i><strong>Đại học Công Nghệ - ĐHQGHN</strong></p>
            </div>
            <div>
                <p><i className="fa fa-map-marker" aria-hidden="true"></i><a href="https://facebook.com">Facebook</a></p>
            </div>
            <div>
                <p><i className="fa fa-history" aria-hidden="true"></i><strong>Lịch sử chat</strong></p>
                <ol>
                    {customer.historyChat.map(room => {
                        return <li key={room.id}><a href="#">Room {room.id} - {room.status == 2? "Đang hoạt động" : "Đã đóng"}</a></li>
                    })}
                </ol>
            </div>
        </div>
    );
};

CustomerFullInfo.propTypes = {
    customer: PropTypes.object.isRequired
};

export default CustomerFullInfo;