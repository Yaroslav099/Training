import React from 'react';

const SaveProgramBtn = props => {
  const saveProgram = () => {
    const { programName, getProgramDataFromHomePage, saveProgram } = props;
    getProgramDataFromHomePage(programName, programData => {
      saveProgram(programData, programName);
    });
  };
  return (
    <button className="btn btn-success" onClick={saveProgram}>
      Save
    </button>
  );
};

export default SaveProgramBtn;
