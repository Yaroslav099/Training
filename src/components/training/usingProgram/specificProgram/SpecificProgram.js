import React, { Component } from 'react';
import FbServices, { FbRefs } from '../../../../firebase-services';
import { isLoggedIn } from '../../../hoc-helpers';
import Loader from '../../../loader/Loader';
import AmountOfReps from '../doneRepsModal/AmountOfReps';
import DoneReps from '../doneRepsModal/DoneReps';
import PageNotFound from '../../../routeErr/PageNotFound';

const { fbProgramRef } = new FbRefs();
const { getSpecificProgramData } = new FbServices();

class SpecificProgram extends Component {
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

  saveDoneRepsToState = programData => {
    this.setState({ programData });
  };

  componentDidMount() {
    const { name } = this.props;
    const setDataToState = data => {
      this.setState({ programData: data });
    };

    getSpecificProgramData(fbProgramRef, name, setDataToState);
  }

  render() {
    console.log(this.state);
    const { programData, activeExercise } = this.state;
    const { name } = this.props;
    if (programData === null) return <PageNotFound />;
    if (programData[0] !== undefined) {
      return (
        <div className="specificProgram">
          <ul className="list-group specificProgram-ul">
            {programData.map(({ exerciseName, weight, reps, repsDone }, index) => {
              return (
                <li className={this.isClassActive(index)} key={index + exerciseName + reps}>
                  <span className="specificProgram-name">{exerciseName}</span>
                  <span className="specificProgram-li_dataContainer">
                    <span className="specificProgram-weight">вага: {weight}</span>
                    <span className="specificProgram-repsToDo">рази: {reps}</span>
                    <DoneReps doneReps={repsDone} />

                    <AmountOfReps
                      name={name}
                      activeExercise={activeExercise}
                      changeActiveExercise={this.changeActiveExercise}
                      saveDoneRepsToState={this.saveDoneRepsToState}
                      index={index}
                      programDataLength={programData.length}
                      programData={programData}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else return <Loader />;
  }
}

export default isLoggedIn(SpecificProgram);
