import React, {PropTypes} from 'react';

const TakeNote = ({newNote, handleOnKeyUpTakeNote, onClickSaveNote, updateNoteState}) => {
    return (
        <div className="take-note d-flex">
            <textarea
                className="form-control"
                id="exampleTextarea" rows="5"
                placeholder="Thêm ghi chú"
                onChange={updateNoteState}
                value={newNote}
                onKeyUp={handleOnKeyUpTakeNote.bind(this)}
            />
            <input
                className="btn btn-primary save-note"
                type="button"
                value="Lưu"
                onClick={onClickSaveNote.bind(this)}
            />
        </div>
    );
};

TakeNote.propTypes = {
    newNote: PropTypes.string.isRequired,
    handleOnKeyUpTakeNote: PropTypes.func.isRequired,
    onClickSaveNote: PropTypes.func.isRequired,
    updateNoteState: PropTypes.func.isRequired
};

export default TakeNote;
