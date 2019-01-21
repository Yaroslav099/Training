import React, { Component } from 'react';
import FbServices, { FbRefs } from '../../../firebase-services';
import ProgramListWiev from '../usingProgram/programsList/ProgramListWiev';
import SaveProgramBtn from './SaveProgramBtn';
import ListOfOnlineUsers from './ListOfOnlineUsers';
import DeleteProgramBtn from './DeleteProgramBtn';
import Loader from '../../loader';

const {
  getProgramsNames,
  getProgramDataFromHomePage,
  saveProgram,
  deleteProgramFromHomePage,
} = new FbServices();

const { fbHomePageRef } = new FbRefs();
class Home extends Component {
  state = {
    programNames: [],
    loading: true,
  };

  renderFunc = programName => {
    return (
      <React.Fragment>
        {programName}
        <div className="homeBtnsContainer">
          <SaveProgramBtn
            programName={programName}
            getProgramDataFromHomePage={getProgramDataFromHomePage}
            saveProgram={saveProgram}
          />
          <DeleteProgramBtn
            programName={programName}
            deleteProgramFromHomePage={deleteProgramFromHomePage}
          />
        </div>
      </React.Fragment>
    );
  };

  componentDidMount() {
    getProgramsNames(fbHomePageRef, programNames => {
      this.setState({ programNames, loading: false });
    });
  }

  render() {
    const { programNames, loading } = this.state;
    if (loading) return <Loader />;
    return (
      <React.Fragment>
        <ListOfOnlineUsers />
        <ProgramListWiev programNames={programNames} renderFunc={this.renderFunc} />
      </React.Fragment>
    );
  }
}

export default Home;
