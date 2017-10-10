import React, {PropTypes} from 'react';

const TakeNote = ({updateNoteState, newNote, handleOnKeyUpTakeNote, onClickSaveNote}) => {
    return (
        <div className="take-note d-flex">
            <textarea
                className="form-control"
                id="exampleTextarea" rows="3"
                placeholder="Add a note..."
                value={newNote}
                onChange={updateNoteState}
                onKeyUp={handleOnKeyUpTakeNote}
            />
            <input
                className="btn btn-primary save-note"
                type="button"
                value="Save"
                onClick={onClickSaveNote.bind(this, newNote)}
            />
            <div className="d-flex press-enter">
                Press
                <span className="ps-color-border-gray-02 px-tiny mx-tiny">enter</span>
                to save
                <button type="button" className="btn btn-toggle active" data-toggle="button">
                    <div className="handle"></div>
                </button>
            </div>
        </div>
    );
};

TakeNote.propTypes = {
    note: PropTypes.string.isRequired,
    updateNoteState: PropTypes.func.isRequired,
    handleOnKeyUpTakeNote: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired
};

export default TakeNote;