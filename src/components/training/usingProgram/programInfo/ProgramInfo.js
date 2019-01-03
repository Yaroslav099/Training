import React, { Component } from 'react';
import FbServices from '../../../../firebase-services';
import Loader from '../../../loader';
import { History } from '../history';

const { getSpecificProgramData, deleteProgram } = new FbServices();

class ProgramInfo extends Component {
  state = {
    sets: '',
    exercises: '',
    doneInfo: '',
    programHistory: false,
  };

  componentDidMount() {
    const {
      match: {
        params: { name },
      },
    } = this.props;

    getSpecificProgramData(name, programData => {
      if (programData) {
        const exercisesNames = programData;
        const sets = programData.length;
        const exercises = this.getAmountOfExercises(programData);
        const doneInfo = this.getDonePersentage(programData);
        this.setState({ sets, exercises, doneInfo });
      }
    });
  }

  getAmountOfExercises = dataArr => {
    const exercisesNamesArr = [];
    dataArr.map(el => {
      if (!exercisesNamesArr.includes(el.exerciseName)) {
        exercisesNamesArr.push(el.exerciseName);
      }
    });
    return exercisesNamesArr.length;
  };

  getDonePersentage = programData => {
    if (programData[programData.length - 1].repsDone) {
      const defaultProgramReps = programData.reduce((acc, val) => {
        return acc + val['reps'];
      }, 0);
      const doneReps = programData.reduce((acc, val) => {
        return acc + val['repsDone'];
      }, 0);

      return ((doneReps * 100) / defaultProgramReps).toFixed(1);
    } else return 0;
  };

  closeProgramInfo = () => {
    const { history } = this.props;
    history.push('/training/');
  };

  openSpecificProgram = name => {
    const { history } = this.props;
    history.push(`/training/${name}`);
  };

  openHistory = () => {
    const {
      history: {
        location: { pathname },
      },
      history,
    } = this.props;

    history.push(`${pathname}/history`);
  };

  deleteProgramFromTheList = name => {
    this.closeProgramInfo();
    deleteProgram(name);
  };

  render() {
    console.log(this.props);
    const {
      match: {
        params: { name },
      },
    } = this.props;
    const { sets, exercises, doneInfo } = this.state;
    if (doneInfo || doneInfo === 0) {
      return (
        <div className="programInfoContainer">
          <div class="card programInfo">
            <div class="card-body">
              <h5 class="card-title">{name}</h5>
              <h5 className="closeProgramInfoBtn" onClick={this.closeProgramInfo}>
                Close
              </h5>
              <p class="card-text1">Вправи - {exercises}</p>
              <p class="card-text2">підходів - {sets}</p>
              <p class="card-text3">Програму зроблено на {doneInfo} %</p>
              <div className="programInfo-btnContainer">
                <button class="btn btn-primary" onClick={() => this.openSpecificProgram(name)}>
                  Start
                </button>
                <History openHistory={this.openHistory} doneInfo={doneInfo} />
                <button class="btn btn-primary" onClick={() => this.deleteProgramFromTheList(name)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else return <Loader />;
  }
}

export default ProgramInfo;
