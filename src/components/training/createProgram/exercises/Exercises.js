import React, { Component } from 'react';
import Exercise from './Exercise';

export default class Exercises extends Component {
  namesOfExercises = [
    'Підтягування на турніку',
    'Віджимання на брусах',
    'Віджиманя від землі',
    'Стойка на руках',
  ];

  render() {
    const { programData } = this.props;
    return (
      <React.Fragment>
        <label for="showExercisesCheckbox" id="showExercisesLabel" />
        <input id="showExercisesCheckbox" type="checkbox" />
        <div className="exercisesContainer">
          {this.namesOfExercises.map((name, index) => (
            <Exercise name={name} key={index} programData={programData} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
