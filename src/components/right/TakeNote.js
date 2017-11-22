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
                onKeyUp={handleOnKeyUpTakeNote}
            />
            <input
                className="btn btn-primary save-note"
                type="button"
                value="Lưu"
                onClick={onClickSaveNote}
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
