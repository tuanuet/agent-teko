import React, {PropTypes} from 'react';

const Tab = ({numberOfEnableRooms}) => {
    return (
        <div>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#chat" role="tab"
                       aria-controls="available">Available</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#unchat" role="tab"
                       aria-controls="enable">Enable<span
                        className="badge badge-danger">{numberOfEnableRooms}</span></a>
                </li>
            </ul>
        </div>
    );
};

Tab.propTypes = {
    numberOfEnableRooms: PropTypes.number
};

export default Tab;