import React, { Component } from 'react';
import ProgramListItemSelectWiev from '../../createProgram/createProgramMenu/ProgramsListItemSelectWiev';
import { withRouter } from 'react-router-dom';
import FbServices from '../../../../firebase-services';

const { upgradeProgram, getSpecificProgramData, fbProgramRef } = new FbServices();

class UpgradeMenu extends Component {
  state = {
    newData: [{ weight: 0, reps: 0 }],
    programData: [],
  };

  setSelectData = (index, data, type) => {
    const { newData: stateData } = this.state;
    const oldExerciseData = stateData[index];
    oldExerciseData[type] = data;
    stateData[index] = oldExerciseData;

    const newData = stateData;
    this.setState({
      newData,
    });
  };

  setData = (e, index, type) => {
    const eltype = e.target.type;
    if (eltype === 'button') {
      let { newData: dataFromState } = this.state;
      const typeBtn = e.target.dataset.type;

      const data =
        typeBtn === 'decrease' ? --dataFromState[index][type] : ++dataFromState[index][type];

      this.setSelectData(index, data, type);
    }
  };

  onSave = () => {
    const { weight, reps } = this.state.newData[0];
    const { programData } = this.state;
    const {
      history,
      match: {
        params: { name },
      },
      location: { pathname },
    } = this.props;
    const newPath = pathname.slice(0, -9);

    upgradeProgram(name, weight, reps, programData);
    history.push(newPath);
  };

  componentDidMount() {
    const {
      history,
      match: {
        params: { name },
      },
    } = this.props;
    getSpecificProgramData(fbProgramRef, name, programData => {
      this.setState({ programData });
    });
  }

  render() {
    const { newData } = this.state;
    return (
      <div className="programInfoContainer">
        <div class="card programInfo">
          <div class="card-body">
            <div className="programInfo-btnContainer">
              <ProgramListItemSelectWiev
                type="weight"
                setData={this.setData}
                index={0}
                programData={newData}
              />
              <ProgramListItemSelectWiev
                type="reps"
                setData={this.setData}
                index={0}
                programData={newData}
              />
              <button class="btn btn-success" onClick={this.onSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UpgradeMenu);
