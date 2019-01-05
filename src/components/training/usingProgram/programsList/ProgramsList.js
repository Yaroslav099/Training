import React, { Component } from 'react';
import FbServices from '../../../../firebase-services';
import { withRouter } from 'react-router';
import Loader from '../../../loader';
import ShareProgramBtn from './ShareProgramBtn';
import ProgramListWiew from './ProgramListWiev';

const { fbRef, getProgramsNames } = new FbServices();

class ProgramsList extends Component {
  state = {
    programNames: [],
  };

  openProgramInfo = (e, name) => {
    if (e.target.type !== 'submit') {
      const { history } = this.props;
      history.push(`/training/program-info/${name}`);
    }
  };

  renderFunc = name => (
    <React.Fragment>
      {name}
      <ShareProgramBtn name={name} />
    </React.Fragment>
  );

  componentDidMount() {
    const setNames = programNames => {
      this.setState({ programNames });
    };

    getProgramsNames(fbRef, setNames);
  }

  render() {
    const { programNames } = this.state;
    const isNames = programNames[0] !== undefined ? true : false;
    const withoutHistory = programNames.filter(el => el !== 'history');

    if (isNames) {
      return (
        <ProgramListWiew
          programNames={withoutHistory}
          openProgramInfo={this.openProgramInfo}
          renderFunc={this.renderFunc}
        />
      );
    } else return <Loader />;
  }
}

export default withRouter(ProgramsList);
