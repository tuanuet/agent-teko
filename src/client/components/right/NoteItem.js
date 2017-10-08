import React, {PropTypes} from 'react';
import ContentEditable from 'react-contenteditable';

const NoteList = ({note}) => {
    return (
            <div className="px-md py-sm note-item">
                <div className="note-item-content d-flex">
                    <ContentEditable
                        className="pr-sm ps-type-ellipsis"
                        html={note.content}
                    />
                    <div className="note-item-timestamp d-flex">
                        {note.createdAt}
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
    );
};

NoteList.propTypes={
    note: PropTypes.object.isRequired
};

export default NoteList;