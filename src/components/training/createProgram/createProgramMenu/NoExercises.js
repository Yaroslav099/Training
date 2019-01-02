import React from 'react';

const NoExercises = ({ isExercise }) => {
  return !isExercise ? <h3 className="noExercise">There are no exercises yet. Add it!</h3> : null;
};

export default NoExercises;
