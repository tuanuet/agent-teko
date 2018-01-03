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

        this.state = {
            isHavingMoreClosed: true,
            isLoadingMoreRooms: false
        }
    }

    adminChooseRoom = roomId => {
        const { actions } = this.props
        actions.adminChooseRoom(roomId)
        actions.messagesFetchRequested(roomId)
        actions.resetNumOfUnReadMessages(roomId)
    }

    loadClosedRoom = (searchValue = '', searchType = '') => {
        const { actions } = this.props

        this.setState({
            isLoadingMoreRooms: true
        }, () => {
            const numberOfClosedRoom = this.props.rooms.filter(room => room.roomStatus === 3).length
            actions.loadClosedRoomRequested(searchValue, searchType, numberOfClosedRoom, CLOSED_ROOM_PAGING_VALUE ).then(res => {
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
        const { rooms, currentRoomId, tags, actions, isLoadingRooms, isMobile } = this.props
        return (
            <LeftComponent
                isMobile={isMobile}
                tags={tags}
                rooms={rooms}
                actions={actions}
                currentRoomId={currentRoomId}
                adminChooseRoom={this.adminChooseRoom}
                isHavingMoreClosed={isHavingMoreClosed}
                isLoadingRooms={isLoadingRooms}
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
        isLoadingRooms: state.isLoadingRooms,
        tags: state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...roomActions, ...chatActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);
