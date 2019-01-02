import React from 'react';

const ProgramsLisItemSelectWiev = props => {
  const { type, index, setData, programData } = props;
  return (
    <div className="programLisItemSelectContainer" onClick={e => setData(e, index, type)}>
      <button type="button" className="btn btn-primary btn-xsm" data-type="decrease">
        -
      </button>
      <span className="programExerciseData">
        <p>{type}</p>
        <p>{programData[index][type]}</p>
      </span>
      <button type="button" className="btn btn-success btn-xsm" data-type="increase">
        +
      </button>
    </div>
  );
};

export default ProgramsLisItemSelectWiev;
