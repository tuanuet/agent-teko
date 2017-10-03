import React, {PropTypes} from 'react';
import SearchBar from './SearchBar';
import TabBar from './TabBar';
import AvailableTabPanel from './AvailableTabPanel';
import EnableTabPanel from './EnableTabPanel';
const LeftComponent = () => {
    return(
        <div className="left">
            <TabBar/>
            <SearchBar/>
            <div className="tab-content">
                <AvailableTabPanel/>
                <EnableTabPanel/>
            </div>
        </div>
    );
};

export default LeftComponent;
