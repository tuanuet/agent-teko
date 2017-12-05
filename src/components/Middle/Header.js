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
            selectedTag: null
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
        this.props.actions.saveTagOfCustomerRequested(currentRoom.customer.id, tag)
    }

    onDeleteTag(tagId) {
        const { currentRoom } = this.props
        if (confirm('Bạn có muốn bỏ tag này?')) {
            this.props.actions.deleteTagOfCustomerRequested(currentRoom.customer.id, tagId)
        }
    }

    render() {
        const { currentRoom, listOfTags, tagsOfRoom, agents } = this.props
        let lookup = _.keyBy(tagsOfRoom, tag => tag.id)
        let availableTags = _.filter(listOfTags, item => {
            return lookup[item.id] === undefined
        })

        let modal = null
        if (this.state.showModals.selectListAgent) {
            modal = <SelectAgent {...this.props} onSave={this.onSaveSelectListAgent} onClose={this.closeModal} agents={agents} />
        }
        if (this.state.showModals.selectTheme) {
            modal = <SelectTheme {...this.props} />
        }

        return (
            <div className="header">
                <div className="title">
                    { currentRoom.roomStatus !== 1 && <div className="group-button">
                        {/* <button className="" data-toggle="tooltip" data-placement="top" title="Change theme"
                        data-target="#exampleModal"><i
                            className="fa fa-wrench" onClick={this.showTheme}/></button> */}
                        {/* <button className="" data-toggle="tooltip" data-placement="top" title="Request user rating">
                        <i className="fa fa-star" onClick={this.sendRequestUserRating}/></button> */}
                        <button type="button" className="clickable" data-toggle="tooltip" data-placement="top" title="Thêm admin vào phòng chat"><i className="fa fa-user-plus" onClick={this.showListAgent}/></button>
                        {/* <button type="button" className="clickable" data-toggle="tooltip" data-placement="top" title="Thoát khỏi phòng chat"><i className="fa fa-sign-out" onClick={this.agentExitRoom}/></button> */}
                        <button className="red clickable" data-toggle="tooltip" data-placement="top" title="Đóng phòng chat"><i className="fa fa-times" onClick={this.unFollowRoom}/></button>
                        { modal }
                    </div> }
                </div>

                <div className="room-tag">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Thêm tag
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {availableTags.map(tag => <a key={tag.id} className="dropdown-item clickable" onClick={this.onSaveTag.bind(this, tag)}>
                                <p style={{ color: `${tag.color}`}}>
                                    {tag.title}
                                </p>
                            </a>)}
                        </div>
                    </div>
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
        tagsOfRoom: currentRoom.tags,
        listOfTags: state.tags,
        agents: state.agents,
        currentAgent: state.agent,
        roomAgents: currentRoom.agents,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...{}, ...chatActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
