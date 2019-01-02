import React, { Component } from 'react';
import { ProgramContext } from '../Program';
import NumOfAddedExercises from './NumOfAddedExercises';

export default class Exercise extends Component {
  state = {
    numOfExercises: 0,
  };

  getNumOfExercisesInTheList = (programData, name) => {
    const exerciseArr = [];
    const numOfExercises = programData.map(el => {
      if (el.exerciseName === name) {
        exerciseArr.push(el);
      }
    });
    return exerciseArr.length;
  };

  componentDidUpdate(prevProps, prevState) {
    const { programData, name } = this.props;
    const numOfExercises = this.getNumOfExercisesInTheList(programData, name);
    const prevNumOfExercises = this.getNumOfExercisesInTheList(prevProps.programData, name);

    if (numOfExercises !== this.state.numOfExercises) {
      this.setState({
        numOfExercises: numOfExercises,
      });
    }
  }

  render() {
    const { name } = this.props;
    const { numOfExercises } = this.state;
    return (
      <ProgramContext.Consumer>
        {context => (
          <div className="card cardContainer">
            <div className="card-body cardContainer-item" onClick={() => context.addExercise(name)}>
              <p className="exercises-name">{name}</p>
              <NumOfAddedExercises numOfExercises={numOfExercises} />
            </div>
          </div>
        )}
      </ProgramContext.Consumer>
    );
  }
}
