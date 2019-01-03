import React, { Component } from 'react';
import FbServices from '../../../../firebase-services';
import { withRouter } from 'react-router';
import Loader from '../../../loader';

const { getProgramsNames } = new FbServices();

class ProgramsList extends Component {
  state = {
    programNames: [],
  };

  openProgramInfo = name => {
    const { history } = this.props;
    history.push(`/training/program-info/${name}`);
  };

  componentDidMount() {
    const setNames = programNames => {
      this.setState({ programNames });
    };

    getProgramsNames(setNames);
  }

  ProgramListWiew = (programNames, showProgramInfo) => (
    <div className="programList">
      <ul className="list-group">
        {programNames.map((name, i) => (
          <React.Fragment>
            {name.text ? (
              <li className="list-group-item list-group-item-success" key={i}>
                {name.text}
              </li>
            ) : (
              <li
                key={i + name}
                index={i}
                className="list-group-item list-group-item-success programList-item program"
                onClick={() => this.openProgramInfo(name)}
              >
                {name}
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );

  render() {
    const { programNames } = this.state;
    const isNames = programNames[0] !== undefined ? true : false;
    const withoutHistory = programNames.filter(el => el !== 'history');

    if (isNames) {
      return this.ProgramListWiew(withoutHistory);
    } else return <Loader />;
  }
}

export default withRouter(ProgramsList);
