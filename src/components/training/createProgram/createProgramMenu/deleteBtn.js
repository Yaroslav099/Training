import React from 'react';
import { ProgramContext } from '../program/Program';

const DeleteBtn = ({ index, name }) => (
  <ProgramContext.Consumer>
    {context => (
      <button
        type="button"
        className="btn btn-danger btn-xsm deleteExerciseBtn"
        onClick={() => {
          context.deleteExercise(index, name);
        }}
      >
        Delete
      </button>
    )}
  </ProgramContext.Consumer>
);

export default DeleteBtn;
