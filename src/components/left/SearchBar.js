import React, {PropTypes} from 'react';

const SearchBar = ({currentTab, searchValue, currentClosedRoomSearchValue, changeSearchValue, searchClosedRooms, checkSubmitSearch}) => {
    return (
        <div className="search-bar">
            <div className="input-group">
                <input type="text" className="form-control" placeholder={currentClosedRoomSearchValue && currentTab === 'closed' ? `Đang tìm kiếm theo từ khóa '${currentClosedRoomSearchValue}'` : `Tìm kiếm theo tên khách ${currentTab !== 'closed' ? `/ tag`: ``}`} aria-describedby="btnGroupAddon" value={searchValue} onChange={changeSearchValue} onKeyUp={currentTab === 'closed' && checkSubmitSearch} />
                { currentTab === 'closed' && <button className="search-rooms-button clickable" onClick={searchClosedRooms}>Tìm kiếm</button> }
            </div>
        </div>
    )
}

export default SearchBar
