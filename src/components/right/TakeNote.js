import React, {PropTypes} from 'react';

const TakeNote = ({newNote, handleOnKeyUpTakeNote, onClickSaveNote, updateNoteState, isMobile}) => {
    return (
        <div className="take-note d-flex">
            <textarea
                className="form-control"
                id="exampleTextarea" rows="3"
                placeholder="Thêm ghi chú"
                onChange={updateNoteState}
                value={newNote}
                onKeyUp={handleOnKeyUpTakeNote}
            />
            { isMobile && <button className="btn btn-primary w-100" onClick={onClickSaveNote}>Lưu ghi chú</button> }
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
