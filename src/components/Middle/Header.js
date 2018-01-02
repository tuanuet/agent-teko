import {connect} from 'react-redux'
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import * as chatActions from '../../container/MiddleContainer/chatActions'
import SelectAgent from "../Modal/SelectAgent"
import SelectTheme from "../Modal/SelectTheme"
import _ from 'lodash'


class Header extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.showListAgent = this.showListAgent.bind(this)
        this.showTheme = this.showTheme.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onSaveSelectListAgent = this.onSaveSelectListAgent.bind(this)
        this.onSetTagStateOfRoom = this.onSetTagStateOfRoom.bind(this)
        this.onSaveTag = this.onSaveTag.bind(this)
        this.onDeleteTag = this.onDeleteTag.bind(this)

        this.state = {
            showModals: {
                selectTheme: false,
                selectListAgent: false
            },
            selectedTag: null,
            filterTag: ''
        }
        this.sendRequestUserRating = this.sendRequestUserRating.bind(this)

    }

    showTheme() {
        this.setState({
            showModals: {
                selectTheme: !this.state.showModals.selectTheme,
                selectListAgent: false
            }
        })
    }

    showListAgent() {
        this.setState({
            showModals: {
                selectTheme: false,
                selectListAgent: !this.state.showModals.selectListAgent
            }
        })
    }

    sendRequestUserRating() {
        this.props.actions.sendRequestUserRating(this.props.currentRoomId)
    }

    componentDidMount() {
        $(document).keyup(e => {
            if (e.keyCode === 27) {
                this.setState({
                    showModals: {
                        selectTheme: false,
                        selectListAgent: false
                    }
                })
                this.closeModal()
            }
        })
    }

    closeModal() {
        this.setState({
            showModals: {
                selectTheme: false,
                selectListAgent: false
            }
        })
    }


    onSaveSelectListAgent(agents) {
        let room = this.props.currentRoom
        this.props.actions.saveSelectAgent(room.roomId, agents, this.closeModal)
    }


    onSetTagStateOfRoom(tagId){
        this.setState({
            selectedTag: tagId
        })
    }

    unFollowRoom = () => {
        if (confirm('Xác nhận đóng phòng chat này lại?')) {
            this.props.actions.unFollowRoom(this.props.currentRoomId, 3)
        }
    }

    onSaveTag(tag) {
        const { currentRoom } = this.props
        this.setState({
            filterTag: ''
        })
        this.props.actions.saveTagOfCustomerRequested(currentRoom.customer.id, tag)
    }

    onDeleteTag(tagId) {
        const { currentRoom } = this.props
        if (confirm('Bạn có muốn bỏ tag này?')) {
            this.props.actions.deleteTagOfCustomerRequested(currentRoom.customer.id, tagId)
        }
    }

    agentExitRoom = () => {
        const { currentRoom, actions, currentAgent } = this.props
        const onlyOneAdmin = currentRoom.agents.length === 1
        const confirmMessage = `Bạn có muốn thoát khỏi phòng chat này?\n\nSau khi thoát, phòng chat này sẽ không hiển thị trong tab Đang hoạt động của bạn.\n\nSau khi thoát, nếu không còn admin nào quản lý khách hàng này, khách hàng sẽ được chuyển về tab Đang chờ.${onlyOneAdmin ? `\n\nLưu ý: Hiện tại, bạn là admin duy nhất quản lý khách hàng này.` : ``}`

        if (confirm(confirmMessage)) {
            actions.adminExitRoom(currentRoom.roomId)
            if (!currentAgent.isBroadcast) {
                actions.removeRoom(currentRoom.roomId)
            }
        }
    }

    markAsUnread = () => {
        const { actions, currentRoomId } = this.props
        actions.markAsUnread(currentRoomId)
    }

    changeFilterTag = e => {
        this.setState({
            filterTag: e.target.value
        })
    }

    autoFocusFilter = () => {
        this.filterTagInput.focus()
    }

    handleEnterTag = e => {
        if (e.keyCode === 13) {
            const { filterTag } = this.state
            const { listOfTags, tagsOfRoom } = this.props
            const availableTags = listOfTags.filter(tag => !tagsOfRoom.find(tor => tor.id === tag.id))
            const filteredTag = availableTags.filter(tag => tag.title.toLowerCase().includes(filterTag.toLowerCase()))
            if (filteredTag.length === 1) {
                this.onSaveTag(filteredTag[0])
            }
        }
    }

    goBackRoomList = () => {
        const { actions } = this.props
        actions.offCurrentRoom()
    }

    render() {
        const { filterTag } = this.state
        const { isLoadingMessages, searchMessage, isSearching, numResult, currentIndex } = this.props
        const { currentRoom, listOfTags, tagsOfRoom, agents, currentAgent, isMobile, toggleShowInfo } = this.props
        let lookup = _.keyBy(tagsOfRoom, tag => tag.id)
        let availableTags = _.filter(listOfTags, item => {
            return lookup[item.id] === undefined
        })

        const currentAgentServeThisRoom = currentRoom.agents.find(agent => agent.id === currentAgent.id)

        let modal = null
        if (this.state.showModals.selectListAgent) {
            modal = <SelectAgent {...this.props} onSave={this.onSaveSelectListAgent} onClose={this.closeModal} agents={agents} currentAgent={currentAgent} />
        }

        return (
            <div className="header">
                { isMobile && <div className="row">
                    <div className="col-12 text-center navigation-mobile">
                        <span className="float-left" onClick={this.goBackRoomList}>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                            Quay lại
                        </span>
                        <span className="float-right" onClick={toggleShowInfo}>
                            { currentRoom.customer && currentRoom.customer.name }
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </span>
                    </div>
                </div> }
                <div className="row">
                    <div className="col-xl-2 col-4">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.autoFocusFilter}>
                                Thêm tag
                            </button>
                            <div id="dropdown-tag" className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{maxHeight: 440, overflowY: 'auto'}}>
                                <div className="dropdown-item">
                                    <input className="form-control" ref={input => this.filterTagInput = input} value={filterTag} onChange={this.changeFilterTag} onKeyDown={this.handleEnterTag} />
                                </div>
                                {availableTags.filter(tag => tag.title.toLowerCase().includes(filterTag.toLowerCase())).map(tag => <a key={tag.id} className="dropdown-item clickable" onClick={this.onSaveTag.bind(this, tag)}>
                                    <p style={{ color: `${tag.color}`}}>
                                        {tag.title}
                                    </p>
                                </a>)}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7 hidden-lg-down">
                        <div className="search-messages">
                            { isSearching ? <div>
                                <span className="move-search">
                                    <i className={`fa fa-angle-up clickable text-primary ${numResult === 0 || currentIndex === numResult - 1 ? `disabled`: ''}`} aria-hidden="true" onClick={this.props.increaseIndex}></i>
                                    <i className={`fa fa-angle-down clickable text-primary ${currentIndex === 0 ? `disabled`: ''}`} aria-hidden="true" onClick={this.props.decreaseIndex}></i>
                                </span>
                                { numResult === 0 ? `Không có kết quả cho "${searchMessage}"` :
                                    `${currentIndex + 1} trên ${numResult} kết quả cho "${searchMessage}"` }
                                <span className="text-success clickable float-right" onClick={this.props.closeSearching}>
                                    Xong
                                    <i className="fa fa-check pl-2" aria-hidden="true"></i>
                                </span>
                            </div> : <div>
                                <input value={searchMessage}
                                    onChange={this.props.changeSearchMessage}
                                    onKeyDown={this.props.keyPressSearch}
                                    className="form-control"
                                    placeholder="Tìm kiếm tin nhắn" />
                                { isLoadingMessages ? <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i> : <i className="fa fa-search clickable" onClick={this.props.goSearching}></i>}
                            </div> }
                        </div>
                    </div>
                    <div className="col-xl-3 col-8">
                        <div className="control-buttons float-right">
                            { currentRoom.roomStatus !== 3 && <div className="group-button">
                                {/* <button className="" data-toggle="tooltip" data-placement="top" title="Change theme"
                                data-target="#exampleModal"><i className="fa fa-wrench" onClick={this.showTheme}/></button> */}
                                {/* <button className="" data-toggle="tooltip" data-placement="top" title="Request user rating">
                                <i className="fa fa-star" onClick={this.sendRequestUserRating}/></button> */}
                                { currentRoom.roomStatus !== 1 && <span>
                                    { currentRoom.roomInfo && currentRoom.roomInfo.numOfUnReadMessages === 0 && <span className="clickable action-button" data-toggle="tooltip" data-placement="top" title="Đánh dấu chưa đọc"><i className="fa fa-envelope-o" onClick={this.markAsUnread}/></span> }
                                    <span className="clickable action-button" data-toggle="tooltip" data-placement="top" title="Thêm admin vào phòng chat"><i className="fa fa-user-plus" onClick={this.showListAgent}/></span>
                                    { currentAgentServeThisRoom && <span className="clickable action-button" data-toggle="tooltip" data-placement="top" title="Thoát khỏi phòng chat"><i className="fa fa-sign-out" onClick={this.agentExitRoom}/></span> }
                                </span> }
                                <span className="red clickable action-button" data-toggle="tooltip" data-placement="top" title="Đóng phòng chat"><i className="fa fa-times" onClick={this.unFollowRoom}/></span>
                            </div> }
                            { modal }
                        </div>
                    </div>
                </div>

                <div className="room-tag">
                    <div className="list-tag">
                        {tagsOfRoom.map(tag => <button key={tag.id} onClick={this.onDeleteTag.bind(this, tag.id)} className="btn btn-success btn-sm tag" type="button" style={{ backgroundColor: `${tag.color}` }}>
                            {`${tag.title}  `} <i className="fa fa-times-circle"></i>
                        </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    changeTheme: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    let currentRoom = state.rooms.find(room => room.roomId === state.currentRoomId)

    return {
        currentRoomId: state.currentRoomId,
        currentRoom: currentRoom,
        currentAgent: state.agent,
        tagsOfRoom: currentRoom.tags,
        listOfTags: state.tags,
        agents: state.agents,
        currentAgent: state.agent,
        roomAgents: currentRoom.agents,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...chatActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
