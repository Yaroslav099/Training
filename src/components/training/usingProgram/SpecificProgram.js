import React, { Component } from 'react';
import FbServices from '../../../firebase-services';
import Loader from '../../loader/Loader';
import AmountOfReps from './doneReps/AmountOfReps';
import DoneReps from './doneReps/DoneReps';

const { getSpecificProgramData } = new FbServices();

export default class SpecificProgram extends Component {
  state = {
    programData: [],
    activeExercise: 0,
  };

  isClassActive = index => {
    const defaultClass = 'list-group-item list-group-item';
    const { activeExercise } = this.state;
    return activeExercise === index ? `${defaultClass}-success` : defaultClass;
  };

  changeActiveExercise = () => {
    let { activeExercise } = this.state;
    const nextExerciseInd = ++activeExercise;
    this.setState({
      activeExercise: nextExerciseInd,
    });
  };

  componentDidMount() {
    const { name } = this.props;
    const setDataToState = data => {
      this.setState({ programData: data });
    };
    getSpecificProgramData(name, setDataToState);
  }

  render() {
    const { programData, activeExercise } = this.state;
    const { name } = this.props;
    if (programData[0] !== undefined) {
      return (
        <div className="specificProgram">
          <ul className="list-group specificProgram-ul">
            {programData.map(({ exerciseName, weight, reps, repsDone }, index) => (
              <li className={this.isClassActive(index)} key={index + exerciseName + reps}>
                <span className="specificProgram-name">{exerciseName}</span>
                <span className="specificProgram-li_dataContainer">
                  <span className="specificProgram-weight">вага: {weight}</span>
                  <span className="specificProgram-repsToDo">рази: {reps}</span>
                  <DoneReps doneReps={repsDone} />
                  <span className="specificProgram-repsDone">
                    <AmountOfReps
                      name={name}
                      activeExercise={activeExercise}
                      changeActiveExercise={this.changeActiveExercise}
                      index={index}
                      programDataLength={programData.length}
                    />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    } else return <Loader />;
  }
}
