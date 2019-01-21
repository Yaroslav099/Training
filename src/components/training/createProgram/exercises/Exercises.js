import React, { Component } from 'react';
import Exercise from './Exercise';
import namesOfExercises from './listOfExercises';

export default class Exercises extends Component {
  render() {
    const { programData } = this.props;
    return (
      <React.Fragment>
        <label htmlFor="showExercisesCheckbox" id="showExercisesLabel" />
        <input id="showExercisesCheckbox" type="checkbox" />
        <div className="exercisesContainer">
          {namesOfExercises.map((name, index) => (
            <Exercise name={name} key={index} programData={programData} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
