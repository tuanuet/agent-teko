import React, {PropTypes} from 'react';

const SearchBar = ({filterBy, currentTab, searchValue, currentClosedRoomSearchValue, changeSearchValue, changeFilterBy, searchClosedRooms, checkSubmitSearch}) => {
    return (
        <div className="search-bar">
            <div className="input-group">
                <input type="text" className="form-control" placeholder={currentClosedRoomSearchValue && currentTab === 'closed' ? `Đang tìm kiếm theo từ khóa '${currentClosedRoomSearchValue}'` : `Tìm kiếm theo tên khách ${currentTab !== 'closed' ? `/ tag`: ``}`} aria-describedby="btnGroupAddon" value={searchValue} onChange={changeSearchValue} onKeyUp={currentTab === 'closed' && checkSubmitSearch} />
                { currentTab === 'available' && <span id="dropdown-filter" className="dropdown">
                    <button type="button" className="search-rooms-button clickable dropdown-toggle" data-toggle="dropdown">
                        { filterBy === 'all' && `Tất cả` }
                        { filterBy === 'unread' && `Chưa đọc` }
                        { filterBy === 'misschat' && `Chưa trả lời` }
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdown-filter">
                        <a className="dropdown-item clickable" onClick={() => changeFilterBy('all')}>Tất cả</a>
                        <a className="dropdown-item clickable" onClick={() => changeFilterBy('unread')}>Chưa đọc</a>
                        <a className="dropdown-item clickable" onClick={() => changeFilterBy('misschat')}>Chưa trả lời</a>
                    </div>
                </span> }
                { currentTab === 'closed' && <button className="search-rooms-button clickable" onClick={searchClosedRooms}>Tìm kiếm</button> }
            </div>
        </div>
    )
}

export default SearchBar
