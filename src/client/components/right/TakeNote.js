import React, {PropTypes} from 'react';

const TakeNote = () => {
    return (
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
    );
};

export default TakeNote;