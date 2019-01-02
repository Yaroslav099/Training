import React from 'react';
import { ProgramContext } from '../Program';

const DeleteBtn = ({ index, name }) => (
  <ProgramContext.Consumer>
    {context => (
      <button
        type="button"
        class="btn btn-danger btn-xsm deleteExerciseBtn"
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
