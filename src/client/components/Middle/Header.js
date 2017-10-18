import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import * as chatActions from '../../container/MiddleContainer/chatActions';
import SelectAgent from "../Modal/SelectAgent";
import SelectTheme from "../Modal/SelectTheme";
import _ from 'lodash';


class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.showListAgent = this.showListAgent.bind(this);
        this.showTheme = this.showTheme.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSaveSelectListAgent = this.onSaveSelectListAgent.bind(this);
        this.onSelectTag = this.onSelectTag.bind(this);
        this.onSetTagStateOfRoom = this.onSetTagStateOfRoom.bind(this);

        this.state = {
            showModals: {
                selectTheme: false,
                selectListAgent: false
            },
            selectedTag: null
        };
        this.sendRequestUserRating = this.sendRequestUserRating.bind(this);

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
        this.props.actions.agentsFetchRequested();
        this.setState({
            showModals: {
                selectTheme: false,
                selectListAgent: !this.state.showModals.selectListAgent
            }
        })
    }

    sendRequestUserRating() {
        this.props.actions.sendRequestUserRating(this.props.currentRoomId);
    }

    componentDidMount() {
        $(document).keyup(e => {
            if (e.keyCode === 27) {
                this.setState({
                    showModals:
                        {
                            selectTheme: false,
                            selectListAgent: false
                        }
                });
                this.closeModal();
            }
        })
    }

    closeModal() {
        this.setState({
            showModals:
                {
                    selectTheme: false,
                    selectListAgent: false
                }

        })
    }


    onSaveSelectListAgent(agents) {
        let room = this.props.currentRoom;
        this.props.actions.saveSelectAgent(room, agents, this.closeModal);
    }


    onSetTagStateOfRoom(tagId){
        console.log("set tag to ", tagId);
        this.setState({
            selectedTag: tagId
        })
    }

    onSelectTag(event){
        let tagId = event.target.value;
        console.log(tagId);
        if (parseInt(tagId) === 3 && !confirm("Xác nhận đóng phòng chat này lại?")) {
            return;
        }
        this.props.actions.setTagOfRoomRequested(this.props.currentRoomId, tagId, this.onSetTagStateOfRoom);
    };

    render() {
        let modal = null;
        if (this.state.showModals.selectListAgent) {
            modal = <SelectAgent {...this.props} onSave={this.onSaveSelectListAgent} onClose={this.closeModal}/>;
        }
        if (this.state.showModals.selectTheme) {
            modal = <SelectTheme {...this.props} />;
        }
        return (
            <div className="header">
                <div className="title">
                    <div>CHAT HEADER</div>
                    <div className="group-button">
                        <button className="" data-toggle="tooltip" data-placement="top" title="Change theme"
                                data-target="#exampleModal"><i
                            className="fa fa-wrench" onClick={this.showTheme}/></button>
                        <button className="" data-toggle="tooltip" data-placement="top" title="Request user rating">
                            <i className="fa fa-star" onClick={this.sendRequestUserRating}/></button>
                        <button className="" data-toggle="tooltip" data-placement="top" title="Add agent to room"><i
                            className="fa fa-plus" onClick={this.showListAgent}/></button>
                        <button className="" data-toggle="tooltip" data-placement="top" title="Push"><i
                            className="fa fa-external-link-square"/></button>
                        <button className="red" data-toggle="tooltip" data-placement="top" title="Close room"><i
                            className="fa fa-times"/></button>

                        {modal}
                    </div>
                </div>

                <div className="list-tag">
                    <div>
                        <button className="tag">Sale</button>
                        <button className="tag">Active</button>
                        <button className="tag red">Delay</button>
                    </div>
                    <div className="set-tag">
                        <span>Trạng thái</span>
                        <select disabled={this.props.currentRoom.status === 3} value={!this.state.selectedTag? this.props.currentRoom.status:this.state.selectedTag} className="selectpicker" onChange={this.onSelectTag}>
                            {this.props.listOfTags.map(tag => {
                                return <option value={tag.id} key={tag.id}>{tag.title}</option>
                            })}
                        </select>
                    </div>

                </div>

            </div>
        );
    }
};

Header.propTypes = {
    changeTheme: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    let currentRoom = _(state.rooms).find(room => room.id === state.currentRoomId);
    return {
        listOfTags: state.listOfTags,
        currentRoomId: state.currentRoomId,
        agents: state.agents,
        otherAgents: currentRoom.otherAgents,
        currentRoom: currentRoom
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...{}, ...chatActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);