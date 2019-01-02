import React from 'react';

const NumOfAddedExercises = ({ numOfExercises }) => {
  if (numOfExercises !== 0) {
    return <p className="exercises-numOfExercise">{numOfExercises}</p>;
  } else return null;
};

export default NumOfAddedExercises;
