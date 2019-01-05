import React, { Component } from 'react';
import FbServices from '../../../firebase-services';
import ProgramListWiev from '../usingProgram/programsList/ProgramListWiev';
import SaveProgramBtn from './SaveProgramBtn';
import DeleteProgramBtn from './DeleteProgramBtn';

const {
  fbHomePageRef,
  fbHomePageProgramRef,
  getProgramsNames,
  getProgramDataFromHomePage,
  saveProgram,
} = new FbServices();

class Home extends Component {
  state = {
    programNames: [],
  };

  renderFunc = programName => {
    return (
      <React.Fragment>
        {programName}
        <SaveProgramBtn
          programName={programName}
          getProgramDataFromHomePage={getProgramDataFromHomePage}
          saveProgram={saveProgram}
        />
      </React.Fragment>
    );
  };

  componentDidMount() {
    getProgramsNames(fbHomePageRef, programNames => {
      this.setState({ programNames });
    });
  }

  render() {
    const { programNames } = this.state;
    return <ProgramListWiev programNames={programNames} renderFunc={this.renderFunc} />;
  }
}

export default Home;
