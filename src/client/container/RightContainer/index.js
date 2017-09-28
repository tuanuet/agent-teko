import React from 'react';
import {connect} from 'react-redux';

class RightContainer extends React.Component {

    render() {
        return (
            <div className="right">
                <div className="customer" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false"
                     aria-controls="collapseExample">

                    <div className="row">
                        <div className="col-md-2">
                            <img className="rounded-circle "
                                 src="https://i1.wp.com/fimo.edu.vn/wp-content/uploads/2017/02/UET-logo-txt.png"/>

                        </div>
                        <div className="col-md-10 customer-short-info">
                            <p>Nguyễn Đức Thuần</p>
                            <p>01664 375 871</p>
                        </div>

                    </div>

                </div>

                <div className="customer-full-info" id="collapseExample">

                    <div>
                        <p><i className="fa fa-user" aria-hidden="true"></i><strong>Nguyễn Đức Thuần</strong></p>
                    </div>
                    <div>
                        <p><i className="fa fa-phone" aria-hidden="true"></i><strong>01664 375 871</strong></p>
                    </div>
                    <div>
                        <p><i className="fa fa-home" aria-hidden="true"></i><strong>Đại học Công Nghệ - ĐHQGHN</strong></p>
                    </div>
                    <div>
                        <p><i className="fa fa-map-marker" aria-hidden="true"></i><a href="https://facebook.com">Facebook</a></p>
                    </div>
                    <div>
                        <p><i className="fa fa-history" aria-hidden="true"></i><strong>Lịch sử chat</strong></p>
                        <ol>
                            <li><a href="#">Room 1 - Đã đóng</a></li>
                            <li><a href="#">Room 2 - Đang hoạt động</a></li>
                        </ol>
                    </div>
                </div>

                <div className="notes-list">

                    <div className="px-md py-sm note-item">
                        <div className="note-item-content d-flex">
                            <div className="pr-sm ps-type-ellipsis" contentEditable={true}>
                                This is the first note of this roome 2134e21321321r32444444444444444444444452345235
                            </div>
                            <div className="note-item-timestamp d-flex">
                                15:23
                                <div className="note-item-edit-label">

                                </div>
                                <div className="dropdown">
                                    <i className="fa fa-cog" aria-hidden="true" id="dropdownMenuButton" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false"></i>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Sửa</a>
                                        <a className="dropdown-item" href="#">Xóa</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="px-md py-sm note-item">
                        <div className="note-item-content d-flex">
                            <div className="pr-sm ps-type-ellipsis">This is the first note of this
                                roome2134e21321321r32444444444444444444444452345235
                            </div>
                            <div className="note-item-timestamp d-flex">
                                15:23
                                <div className="note-item-edit-label">
                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="px-md py-sm note-item">
                        <div className="note-item-content d-flex">
                            <div className="pr-sm ps-type-ellipsis">
                                This is the first note of this roome2134e21321321r32444444444444444444444452345235
                            </div>
                            <div className="note-item-timestamp d-flex">
                                15:23
                                <div className="note-item-edit-label">
                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="px-md py-sm note-item">
                        <div className="note-item-content d-flex">
                            <div className="pr-sm ps-type-ellipsis">This is the first note of this
                                roome2134e21321321r32444444444444444444444452345235
                            </div>
                            <div className="note-item-timestamp d-flex">
                                15:23
                                <div className="note-item-edit-label">
                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="px-md py-sm note-item">
                        <div className="note-item-content d-flex">
                            <div className="pr-sm ps-type-ellipsis">This is the first note of this
                                roome2134e21321321r32444444444444444444444452345235
                            </div>
                            <div className="note-item-timestamp d-flex">
                                15:23
                                <div className="note-item-edit-label">
                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="px-md py-sm note-item">
                        <div className="note-item-content d-flex">
                            <div className="pr-sm ps-type-ellipsis">This is the first note of this
                                roome2134e21321321r32444444444444444444444452345235
                            </div>
                            <div className="note-item-timestamp d-flex">
                                15:23
                                <div className="note-item-edit-label">
                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="take-note d-flex">
                    <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Add a note..."></textarea>
                    <div className="d-flex press-enter">
                        Press
                        <span className="ps-color-border-gray-02 px-tiny mx-tiny">enter</span>
                        to save
                        <button type="button" className="btn btn-toggle active" data-toggle="button">
                            <div className="handle"></div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(RightContainer);
