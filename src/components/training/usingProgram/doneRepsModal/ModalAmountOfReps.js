import React, { Component } from 'react';
import FbServices from '../../../../firebase-services';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const { saveDoneReps, saveProgramDataToHistory } = new FbServices();

class AmountOfRepsModal extends Component {
  state = {
    repsDone: 0,
  };

  setReps = e => {
    const type = e.target.dataset.type;
    if (type) {
      let { repsDone: prevReps } = this.state;
      const repsDone = type === 'decrease' ? (prevReps !== 0 ? --prevReps : 0) : ++prevReps;
      this.setState({ repsDone });
    }
  };

  saveReps = () => {
    const { repsDone } = this.state;
    const {
      name,
      activeExercise,
      changeActiveExercise,
      showHideModal,
      programDataLength,
    } = this.props;

    saveDoneReps(repsDone, name, activeExercise);
    changeActiveExercise();
    showHideModal();
    console.log(this.state);
    if (programDataLength === activeExercise + 1) {
      const { history, programData } = this.props;
      const time = moment().format('LLL');
      saveProgramDataToHistory(name, time, programData);
      history.push(`/training/${name}/statistic/`);
    }
  };

  render() {
    const { repsDone } = this.state;
    return (
      <div className="amountOfRepsModal" onClick={e => this.setReps(e)}>
        <button type="button" className="btn btn-primary btn-lg" data-type="decrease">
          -
        </button>
        <span className="amountOfRepsModal-reps">{repsDone}</span>
        <button type="button" className="btn btn-success btn-lg" data-type="increase">
          +
        </button>
        <button type="button" className="btn btn-warning btn-lg" onClick={this.saveReps}>
          ok
        </button>
      </div>
    );
  }
}

export default withRouter(AmountOfRepsModal);
