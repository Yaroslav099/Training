import React from 'react';

const DeleteProgramBtn = ({ programName, deleteProgramFromHomePage }) => {
  return (
    <button className="btn btn-danger" onClick={() => deleteProgramFromHomePage(programName)}>
      Delete
    </button>
  );
};

export default DeleteProgramBtn;
