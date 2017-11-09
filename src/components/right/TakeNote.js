import React, {PropTypes} from 'react';

const TakeNote = ({newNote, handleOnKeyUpTakeNote, onClickSaveNote, updateNoteState}) => {
    return (
        <div className="take-note d-flex">
            <textarea
                className="form-control"
                id="exampleTextarea" rows="3"
                placeholder="Add a note..."
                onChange={updateNoteState}
                value={newNote}
                onKeyUp={handleOnKeyUpTakeNote.bind(this)}
            />
            <input
                className="btn btn-primary save-note"
                type="button"
                value="Save"
                onClick={onClickSaveNote.bind(this)}
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
    newNote: PropTypes.string.isRequired,
    handleOnKeyUpTakeNote: PropTypes.func.isRequired,
    onClickSaveNote: PropTypes.func.isRequired,
    updateNoteState: PropTypes.func.isRequired
};

export default TakeNote;