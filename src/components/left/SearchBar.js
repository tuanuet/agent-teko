import React, {PropTypes} from 'react';

const SearchBar = ({searchValue, changeSearchValue}) => {
    return (
        <div className="search-bar">
            <div className="input-group">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" className="form-control" placeholder="Tìm kiếm (tên khách / tag)"
                       aria-describedby="btnGroupAddon" value={searchValue} onChange={changeSearchValue} />
            </div>
        </div>
    );
};

export default SearchBar;
