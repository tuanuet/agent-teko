import React, {PropTypes} from 'react';
import * as helper from '../../helper'

class NoteItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            noteContent: props.note.content
        }
    }

    handleNoteChange = e => {
        this.setState({
            noteContent: e.target.value
        })
    }

    handleToggleEditNote = () => {
        this.setState((prevState, props) => ({
            isEditing: !prevState.isEditing,
            noteContent: props.note.content
        }))
    }

    handleSaveNote = () => {
        const { noteContent } = this.state
        const { note, updateNote } = this.props
        updateNote({
            noteId: note.id,
            content: noteContent
        }, () => {
            this.setState({
                isEditing: false
            })
        })
    }

    render = () => {
        const { isEditing, noteContent } = this.state
        const { note, editNote, deleteNote } = this.props
        return <div className="px-md py-sm note-item">

            <div className="note-item-content">
                { isEditing ? <textarea className="form-control" rows="3" value={noteContent} onChange={this.handleNoteChange} /> : <p className="pr-sm ps-type-ellipsis">{note.content}</p> }

                <div className="note-item-timestamp">
                    { note.createdBy && <p style={{display: 'block'}}>Được tạo bởi { note.createdName } </p> }
                    <p className="capitalize-first" style={{ marginRight: '15px' }}>{helper.formatDatetime(note.createdAt)}</p>
                    { isEditing && <p className="clickable"
                        style={{ marginRight: '15px' }}
                        onClick={this.handleSaveNote}>
                        Lưu
                    </p> }
                    <p className="clickable"
                        onClick={this.handleToggleEditNote}
                        style={{ marginRight: '15px' }}>
                        { isEditing ? 'Hủy' : 'Sửa' }
                    </p>
                    <p className="clickable" onClick={e => deleteNote(note.id)}>Xóa</p>
                </div>
            </div>
        </div>
    }
}

NoteItem.propTypes={
    note: PropTypes.object,
};

export default NoteItem;
