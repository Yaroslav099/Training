import React, { Component } from 'react';

class SaveProgramBtn extends Component {
  saveProgram = () => {
    const { programName, getProgramDataFromHomePage, saveProgram } = this.props;
    getProgramDataFromHomePage(programName, programData => {
      saveProgram(programData, programName);
    });
  };
  render() {
    console.log(this.props.programName);
    return (
      <button class="btn btn-success" onClick={this.saveProgram}>
        Save
      </button>
    );
  }
}

export default SaveProgramBtn;
