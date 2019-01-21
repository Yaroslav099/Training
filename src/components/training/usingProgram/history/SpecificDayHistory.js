import React, { Component } from 'react';
import { HistoryServices } from '../../../../firebase-services';
import { isLoggedIn } from '../../../hoc-helpers';
import Loader from '../../../loader';
import PageNotFound from '../../../routeErr/PageNotFound';

const { getProgramHistory } = new HistoryServices();

class SpecificDayHistory extends Component {
  state = {
    history: null,
  };

  setProgramDatesToState = history => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const historyByDate = Object.values(history)[id];
    this.setState({ history: historyByDate });
  };

  openOneOfHistoryDays = index => {
    const {
      history,
      location: { pathname },
    } = this.props;
    history.push(`${pathname}${index}/`);
  };

  componentDidMount() {
    const {
      match: {
        params: { name },
      },
    } = this.props;
    getProgramHistory(name, this.setProgramDatesToState);
  }

  render() {
    const { history } = this.state;
    if (history === null) return <PageNotFound />;
    if (history) {
      return (
        <div className="specificProgram">
          <ul className="list-group specificProgram-ul">
            {history.map(({ exerciseName, weight, reps, repsDone }, index) => (
              <li className="list-group-item list-group-item" key={index + exerciseName + reps}>
                <span className="specificDay-name">{exerciseName}</span>
                <span className="specificDay-info">
                  <span className="specificProgram-weight">вага: {weight}</span>
                  <span className="specificProgram-repsDone">зроблено раз: {repsDone}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    } else return <Loader />;
  }
}

export default isLoggedIn(SpecificDayHistory);
