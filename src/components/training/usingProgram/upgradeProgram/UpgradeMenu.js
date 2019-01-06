import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FbServices from '../../../../firebase-services';
import Loader from '../../../loader';
import UpgradeInput from './UpgradeInput';
const { upgradeProgram, getSpecificProgramData, fbProgramRef } = new FbServices();

class UpgradeMenu extends Component {
  state = {
    newData: [{ weight: 0, reps: 0 }],
    programData: [],
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

    upgradeProgram(programData, name);
    history.push(newPath);
  };

  upgradeSomeValueInData = (e, index, type) => {
    const { programData } = this.state;
    let value = e.target.value;
    programData[index][type] = value;

    this.setState({ programData });
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
    const { programData } = this.state;
    console.log(programData);
    if (programData[0] !== undefined) {
      return (
        <div className="specificProgram">
          <h4 className="specificProgram-info">
            Для того щоб змінити вагу або повтори нажміть на цифру
          </h4>
          <ul className="list-group specificProgram-ul">
            {programData.map(({ exerciseName, reps }, index) => (
              <li className="list-group-item list-group-item" key={index + exerciseName}>
                <span className="specificProgram-name">{exerciseName}</span>
                <span className="specificProgram-li_dataContainer">
                  <span className="specificProgram-weight">
                    вага:{' '}
                    <UpgradeInput
                      value={this.state.programData[index]['weight']}
                      type="weight"
                      index={index}
                      upgradeSomeValueInData={this.upgradeSomeValueInData}
                    />
                  </span>
                  <span className="specificProgram-repsToDo">
                    рази:{' '}
                    <UpgradeInput
                      value={this.state.programData[index]['reps']}
                      type="reps"
                      index={index}
                      upgradeSomeValueInData={this.upgradeSomeValueInData}
                    />
                  </span>
                </span>
              </li>
            ))}
            ;
          </ul>

          <button class="btn btn-success saveUpgradeBtn" onClick={this.onSave}>
            Save
          </button>
        </div>
      );
    } else return <Loader />;
  }
}

export default withRouter(UpgradeMenu);
