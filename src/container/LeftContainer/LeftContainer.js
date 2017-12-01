import React from 'react';
import {connect} from 'react-redux';
import LeftComponent from '../../components/left/LeftComponent';
import {bindActionCreators} from 'redux';
import * as roomActions from './roomActions';
import * as chatActions from '../MiddleContainer/chatActions';
import { CLOSED_ROOM_PAGING_VALUE } from '../../constants/config'

class LeftContainer extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.adminChooseRoom = this.adminChooseRoom.bind(this);
        this.loadClosedRoom = this.loadClosedRoom.bind(this);

        this.state = {
            isHavingMoreClosed: true,
            isLoadingMoreRooms: false
        }
    }

    /**
     * handle event when admin choose a room to chat
     * @param event
     */
    adminChooseRoom(roomId) {
        const {rooms} = this.props;
        let room = rooms.find(room => roomId === room.roomId);
        this.props.actions.adminChooseRoom(roomId);
        this.props.actions.messagesFetchRequested(room);
        this.props.actions.resetNumOfUnReadMessages(room);
    }

    loadClosedRoom() {
        this.setState({
            isLoadingMoreRooms: true
        }, () => {
            const numberOfClosedRoom = this.props.rooms.filter(room => room.roomStatus === 3).length
            this.props.actions.loadClosedRoomRequested(numberOfClosedRoom, CLOSED_ROOM_PAGING_VALUE).then(res => {
                const isLoadMore = res.length !== 0
                this.setState({
                    isLoadingMoreRooms: false,
                    isHavingMoreClosed: isLoadMore
                })
            })
        })
    }

    /**
     * render method
     * @returns {XML}
     */
    render() {
        const { isLoadingMoreRooms, isHavingMoreClosed } = this.state
        const { rooms, currentRoomId, tags, actions } = this.props
        return (
            <LeftComponent
                tags={tags}
                rooms={rooms}
                actions={actions}
                currentRoomId={currentRoomId}
                adminChooseRoom={this.adminChooseRoom}
                isHavingMoreClosed={isHavingMoreClosed}
                isLoadingMoreRooms={isLoadingMoreRooms}
                loadClosedRoom={this.loadClosedRoom}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        rooms: state.rooms,
        currentRoomId: state.currentRoomId,
        tags: state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...{}, ...roomActions, ...chatActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
