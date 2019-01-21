import React, { Component } from 'react';
import { isLoggedIn } from '../../../hoc-helpers';
import FbServices from '../../../../firebase-services';
import Loader from '../../../loader';

const { getStatisticOfTheTraining } = new FbServices();

class Statistic extends Component {
  state = {
    statistic: '',
  };

  setStatisticToState = data => {
    const defaultProgramReps = data.reduce((acc, val) => {
      return +acc + +val['reps'];
    }, 0);
    const doneReps = data.reduce((acc, val) => {
      return +acc + +val['repsDone'];
    }, 0);

    const result = ((doneReps * 100) / defaultProgramReps).toFixed(0);

    this.setState({
      statistic: result,
    });
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    getStatisticOfTheTraining(params.name, this.setStatisticToState);
  }

  render() {
    const { statistic } = this.state;
    if (statistic) return <div className="statistic">Ви виконали програму на {statistic} %</div>;
    else return <Loader />;
  }
}

export default isLoggedIn(Statistic);
