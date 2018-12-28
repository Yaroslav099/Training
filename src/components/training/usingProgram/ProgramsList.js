import React, { Component } from 'react';
import FbServices from '../../../firebase-services';
import { withRouter } from 'react-router';
import Loader from '../../loader';

const { getProgramsNames } = new FbServices();

class ProgramsList extends Component {
  state = {
    programNames: [],
  };

  openSpecificProgram = name => {
    const { history } = this.props;
    history.push(`/training/${name}`);
  };

  componentDidMount() {
    const setNames = programNames => {
      this.setState({ programNames });
    };

    getProgramsNames(setNames);
  }

  ProgramListWiew = programNames => (
    <div className="programList">
      <ul className="list-group">
        {programNames.map((name, i) => (
          <li
            key={i + name}
            index={i}
            className="list-group-item list-group-item-success programList-item"
            onClick={() => this.openSpecificProgram(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );

  render() {
    const { programNames } = this.state;
    return programNames[0] !== undefined ? this.ProgramListWiew(programNames) : <Loader />;
  }
}

export default withRouter(ProgramsList);
