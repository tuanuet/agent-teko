import React, {PropTypes} from 'react';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <div className="input-group">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" className="form-control" placeholder="Search"
                       aria-describedby="btnGroupAddon"/>
            </div>
        </div>
    );
};

export default SearchBar;
