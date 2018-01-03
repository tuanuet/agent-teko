import React, {PropTypes} from 'react'

class SearchBar extends React.PureComponent {
    handleChangeSearchType = e => {
        if (e.keyCode === 40) {
            this.firstChoice.focus()
        }
    }
    handleTabEnterSearch = searchType => e => {
        if (e.keyCode === 13) {
            if (searchType === 'message') return false
            this.props.searchRooms(searchType)
        } else if (e.keyCode === 38) {
            if (e.target.previousSibling) e.target.previousSibling.focus()
        } else if (e.keyCode === 40) {
            if (e.target.nextSibling) e.target.nextSibling.focus()
        }
    }
    render() {
        const { filterBy, currentTab, searchValue, currentClosedRoomSearchValue, changeSearchValue, changeFilterBy, checkSubmitSearch, searchType, searchRooms, resetSearchType } = this.props

        return <div className="search-bar">
            <div className="input-group">
                <input type="text" className="form-control" placeholder={`Tìm kiếm khách hàng`} aria-describedby="btnGroupAddon" value={searchValue} onChange={changeSearchValue} disabled={searchType} onKeyDown={this.handleChangeSearchType} />
                { searchType && <i className="fa fa-times pr-2 clickable" aria-hidden="true" onClick={resetSearchType}></i> }
                { currentTab === 'available' && <span id="dropdown-filter" className="dropdown">
                    <button type="button" className="search-rooms-button clickable dropdown-toggle" data-toggle="dropdown" tabIndex={-1}>
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
            </div>
            { searchValue && <div className="search-choice-container">
                { searchType ? <div className="search-result">
                    Tìm kiếm khách hàng có { searchType === 'customer' ? `tên hoặc SĐT`
                        : searchType === 'tag' ? `tag` : searchType === 'note' ? `ghi chú` : `` } chứa "{searchValue}"
                </div> : <div className="search-choice">
                    <div tabIndex={0}
                        onClick={e => searchRooms('customer')}
                        onKeyDown={this.handleTabEnterSearch('customer')}
                        ref={element => this.firstChoice = element}
                        title="Tìm kiếm khách hàng có tên hoặc SĐT chứa từ khóa">
                        <span>Khách chứa</span>{searchValue}
                    </div>
                    <div tabIndex={0}
                        onClick={e => searchRooms('tag')}
                        onKeyDown={this.handleTabEnterSearch('tag')}
                        title="Tìm kiếm khách hàng có tag chứa từ khóa">
                        <span>Tag chứa</span>{searchValue}
                    </div>
                    <div tabIndex={0}
                        onClick={e => searchRooms('note')}
                        onKeyDown={this.handleTabEnterSearch('note')}
                        title="Tìm kiếm khách hàng có ghi chú chứa từ khóa">
                        <span>Ghi chú chứa</span>{searchValue}
                    </div>
                    <div tabIndex={0}
                        className="disable"
                        onKeyDown={this.handleTabEnterSearch('message')}
                        title="Tính năng đang được phát triển">
                        <span>Tin nhắn chứa</span>{searchValue}
                    </div>
                </div> }
            </div> }
        </div>
    }
}

export default SearchBar
