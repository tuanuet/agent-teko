import React, {PropTypes} from 'react';

const CustomerFullInfo = () => {
    return (
        <div className="customer-full-info" id="collapseExample">

            <div>
                <p><i className="fa fa-user" aria-hidden="true"></i><strong>Nguyễn Đức Thuần</strong></p>
            </div>
            <div>
                <p><i className="fa fa-phone" aria-hidden="true"></i><strong>01664 375 871</strong></p>
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
                    <li><a href="#">Room 1 - Đã đóng</a></li>
                    <li><a href="#">Room 2 - Đang hoạt động</a></li>
                </ol>
            </div>
        </div>
    );
};

export default CustomerFullInfo;