import React, {PropTypes} from 'react';

const Tab = ({numberOfEnableRooms, loadClosedRoom}) => {
    return (
        <div>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#chat" role="tab"
                    aria-controls="available">Đang hoạt động</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#unchat" role="tab"
                    aria-controls="enable">Đang chờ
                        <span className="badge badge-danger">{numberOfEnableRooms}</span>
                    </a>
                </li>
                <li className="nav-item" onClick={loadClosedRoom}>
                    <a className="nav-link" data-toggle="tab" href="#closedchat" role="tab"
                    aria-controls="available">Lịch sử chat</a>
                </li>
            </ul>
        </div>
    );
};

Tab.propTypes = {
    numberOfEnableRooms: PropTypes.number
};

export default Tab;
