import React, {PropTypes} from 'react'

class SearchBar extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showSearchTab: false
        }
    }
    componentWillMount() {
        window.addEventListener('mousedown', this.handleOutsideClick)
    }
    handleOutsideClick = e => {
        const { showSearchTab } = this.state
        if (!showSearchTab) return false
        if (!this.searchBar) return false
        if (!this.searchBar.contains(e.target) && e.target.id !== 'toggle-search-bar') {
            this.setState({
                showSearchTab: false
            })
        }
    }
    handleTabEnterSearch = e => {
        if (e.keyCode === 13) {
            this.props.searchRooms()
        } else if (e.keyCode === 38) {
            if (e.target.parentElement.previousSibling) e.target.parentElement.previousSibling.lastChild.focus()
        } else if (e.keyCode === 40) {
            if (e.target.parentElement.nextSibling) e.target.parentElement.nextSibling.lastChild.focus()
        }
    }
    showSearchTab = () => {
        this.setState({
            showSearchTab: true
        })
    }
    handleCloseSearchTab = () => {
        this.setState({
            showSearchTab: false
        }, () => {
            this.props.resetSearchData()
        })
    }
    handleClickSearch = () => {
        this.setState({
            showSearchTab: false
        }, () => {
            this.props.searchRooms()
        })
    }
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleOutsideClick)
    }
    render() {
        const { showSearchTab } = this.state
        const { filterBy, currentTab, searchData, currentClosedRoomSearchValue, changeSearchValue, changeFilterBy, checkSubmitSearch, searchRooms, resetSearchData, isSearchMode } = this.props

        return <div className="search-bar">
            <div className="input-group">
                <span id="toggle-search-bar" type="text" className="form-control clickable" aria-describedby="btnGroupAddon" disabled={isSearchMode} onClick={!isSearchMode && (!showSearchTab ? this.showSearchTab : this.handleCloseSearchTab)}>
                    Tìm kiếm khách hàng
                </span>
                { isSearchMode && <i className="fa fa-times ml-2 pr-2 clickable" aria-hidden="true" onClick={this.handleCloseSearchTab}></i> }
                { currentTab === 'available' && <span id="dropdown-filter" className="dropdown">
                    <button type="button" className="search-rooms-button clickable dropdown-toggle" data-toggle="dropdown" tabIndex={-1}>
                        { filterBy === 'all' && `Tất cả` }
                        { filterBy === 'unread' && `Chưa đọc` }
                        { filterBy === 'misschat' && `Chưa trả lời` }
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-filter">
                        <a className="dropdown-item clickable" onClick={() => changeFilterBy('all')}>Tất cả</a>
                        <a className="dropdown-item clickable" onClick={() => changeFilterBy('unread')}>Chưa đọc</a>
                        <a className="dropdown-item clickable" onClick={() => changeFilterBy('misschat')}>Chưa trả lời</a>
                    </div>
                </span> }
            </div>
            <div className="search-choice-container">
                { isSearchMode ? <div className="search-result">
                    <div>{ searchData['customer'] && `Tìm kiếm khách hàng có tên hoặc SĐT chứa "${searchData['customer']}"` }</div>
                    <div>{ searchData['tag'] && `Tìm kiếm khách hàng có tag chứa "${searchData['tag']}"` }</div>
                    <div>{ searchData['note'] && `Tìm kiếm khách hàng có ghi chú chứa "${searchData['note']}"` }</div>
                    <div>{ searchData['message'] && `Tìm kiếm khách hàng có tin nhắn chứa "${searchData['message']}"` }</div>
                </div> : showSearchTab && <div className="search-choice" ref={node => this.searchBar = node}>
                    <div className="row"
                        onKeyDown={this.handleTabEnterSearch}
                        ref={element => this.firstChoice = element}
                        title="Tìm kiếm khách hàng có tên hoặc SĐT chứa từ khóa">
                        <span className="col-4 col-form-label">Khách chứa</span>
                        <input value={searchData['customer']}
                            className="form-control col-7"
                            onChange={changeSearchValue('customer')}
                            autoFocus />
                    </div>
                    <div className="row"
                        onKeyDown={this.handleTabEnterSearch}
                        title="Tìm kiếm khách hàng có tag chứa từ khóa">
                        <span className="col-4 col-form-label">Tag chứa</span>
                        <input value={searchData['tag']}
                            className="form-control col-7"
                            onChange={changeSearchValue('tag')} />
                    </div>
                    <div className="row"
                        onKeyDown={this.handleTabEnterSearch}
                        title="Tìm kiếm khách hàng có ghi chú chứa từ khóa">
                        <span className="col-4 col-form-label">Ghi chú chứa</span>
                        <input value={searchData['note']}
                            className="form-control col-7"
                            onChange={changeSearchValue('note')} />
                    </div>
                    <div className="row disable"
                        onKeyDown={this.handleTabEnterSearch}
                        title="Tính năng đang được phát triển">
                        <span className="col-4 col-form-label">Tin nhắn chứa</span>
                        <input value={searchData['message']}
                            className="form-control col-7"
                            onChange={changeSearchValue('message')} disabled />
                    </div>
                    <div className="row">
                        <button className="btn btn-outline-success btn-block btn-sm clickable" onClick={this.handleClickSearch}>Tìm kiếm</button>
                    </div>
                </div> }
            </div>
        </div>
    }
}

export default SearchBar
