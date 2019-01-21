import React, { Component } from 'react';
import FbServices, { FbRefs, HistoryServices } from '../../../../firebase-services';
import { History } from '../history';
import { UpgradeBtn } from '../upgradeProgram';
import { isLoggedIn } from '../../../hoc-helpers';
import Loader from '../../../loader';

const { fbProgramRef } = new FbRefs();

const { getSpecificProgramData, deleteProgram } = new FbServices();
const { deleteProgramFromHistory } = new HistoryServices();

class ProgramInfo extends Component {
  state = {
    sets: '',
    exercises: '',
    doneInfo: '',
    programHistory: false,
  };

  _isMounted = false;

  componentDidMount() {
    const {
      match: {
        params: { name },
      },
    } = this.props;
    this._isMounted = true;

    getSpecificProgramData(fbProgramRef, name, programData => {
      if (programData) {
        const exercisesNames = programData;
        const sets = programData.length;
        const exercises = this.getAmountOfExercises(programData);
        const doneInfo = this.getDonePersentage(programData);
        if (this._isMounted) {
          this.setState({ sets, exercises, doneInfo });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    const defaultProgramReps = programData.reduce((acc, val) => {
      return +acc + +val['reps'];
    }, 0);
    const doneReps = programData.reduce((acc, val) => {
      return +acc + +val['repsDone'];
    }, 0);

    return ((doneReps * 100) / defaultProgramReps).toFixed(0);
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
    deleteProgram(name);
    deleteProgramFromHistory(name);
    this.closeProgramInfo();
  };

  render() {
    const {
      match: {
        params: { name },
      },
    } = this.props;
    const { sets, exercises, doneInfo } = this.state;
    if (doneInfo || doneInfo === 0) {
      return (
        <div className="programInfoContainer">
          <div className="card programInfo">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <h5 className="closeProgramInfoBtn" onClick={this.closeProgramInfo}>
                Close
              </h5>
              <p className="card-text1">Вправи - {exercises}</p>
              <p className="card-text2">підходів - {sets}</p>
              <p className="card-text3">Програму зроблено на {doneInfo} %</p>
              <div className="programInfo-btnContainer">
                <button className="btn btn-primary" onClick={() => this.openSpecificProgram(name)}>
                  Start
                </button>
                <UpgradeBtn doneInfo={doneInfo} />
                <History openHistory={this.openHistory} doneInfo={doneInfo} />
                <button
                  className="btn btn-primary"
                  onClick={() => this.deleteProgramFromTheList(name)}
                >
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

export default isLoggedIn(ProgramInfo);
