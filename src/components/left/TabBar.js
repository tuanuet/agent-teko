import React, {PropTypes} from 'react';

const Tab = ({currentTab, numberOfEnableRooms, loadClosedRoom, changeCurrentTab}) => {
    return (
        <div>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" onClick={e => changeCurrentTab('available')}>
                    <a className={`nav-link ${currentTab === 'available' && 'active'}`} data-toggle="tab" href="#chat" role="tab">Đang hoạt động</a>
                </li>
                <li className="nav-item" onClick={e => changeCurrentTab('enable')}>
                    <a className={`nav-link ${currentTab === 'enable' && 'active'}`} data-toggle="tab" href="#unchat" role="tab">Đang chờ
                        <span className="badge badge-danger">{numberOfEnableRooms}</span>
                    </a>
                </li>
                <li className="nav-item" onClick={e => { changeCurrentTab('closed'); loadClosedRoom(); }}>
                    <a className={`nav-link ${currentTab === 'closed' && 'active'}`} data-toggle="tab" href="#closedchat" role="tab">Lịch sử chat</a>
                </li>
            </ul>
        </div>
    );
};

Tab.propTypes = {
    numberOfEnableRooms: PropTypes.number
};

export default Tab;
