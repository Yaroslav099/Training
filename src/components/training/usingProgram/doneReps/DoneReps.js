import React from 'react';

const DoneReps = ({ doneReps }) => {
  if (doneReps) {
    return <span className="doneReps">зроблено: {doneReps}</span>;
  } else return null;
};

export default DoneReps;
