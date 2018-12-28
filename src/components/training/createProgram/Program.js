import React, { Component } from 'react';
import Exercises from './exercises/Exercises';
import ProgramsList from './createProgramMenu/ProgramsList';
import FbServices from '../../../firebase-services';

const { saveProgram } = new FbServices();

const ProgramContext = React.createContext();

export default class Program extends Component {
  state = {
    programData: [],
    programName: '',
    data: 8,
    err: true,
  };

  static contextType = ProgramContext;

  addExercise = exerciseName => {
    const newExercise = {
      exerciseName,
      weight: 8,
      reps: 8,
      repsDone: 0,
    };
    const { programData } = this.state;
    programData.push(newExercise);

    this.setState({ programData });
  };

  deleteExercise = (elIndex, name) => {
    let { programData } = this.state;
    const firstPart = programData.slice(0, elIndex);
    const secondPart = programData.slice(elIndex + 1);
    const newData = [...firstPart, ...secondPart];
    this.setState({ programData: newData });

    this.setState({
      err: true,
    });
  };

  setSelectData = (index, data, type) => {
    const { programData: stateData } = this.state;
    const oldExerciseData = stateData[index];
    oldExerciseData[type] = data;
    stateData[index] = oldExerciseData;

    const programData = stateData;
    this.setState({
      programData,
    });
  };

  setProgramName = e => {
    const programName = e.target.value;
    this.setState({ programName });
  };

  saveProgramNameToData = programName => {
    this.setState({
      programName,
    });
  };

  clearState = () => {
    this.setState({
      programData: [],
      programName: '',
    });
  };

  saveDataAndClearState = (programData, programName) => {
    saveProgram(programData, programName);
    this.clearState();
  };

  setData = (e, index, type) => {
    const eltype = e.target.type;
    if (eltype === 'button') {
      let { programData: oldData } = this.state;
      const typeBtn = e.target.dataset.type;

      const data =
        typeBtn === 'decrease'
          ? oldData[index][type] !== 0
            ? --oldData[index][type]
            : 0
          : ++oldData[index][type];

      this.setSelectData(index, data, type);
    }
  };

  contextValue = {
    programData: this.state.programData,
    programName: this.state.programName,
    addExercise: this.addExercise,
    deleteExercise: this.deleteExercise,
    clearState: this.clearState,
  };

  render() {
    console.log(this.state);
    const { programData, programName } = this.state;
    return (
      <ProgramContext.Provider value={this.contextValue}>
        <div className="programMainContainer">
          <Exercises />
          <ProgramsList
            setData={this.setData}
            saveProgramNameToData={this.saveProgramNameToData}
            programData={programData}
            setProgramName={this.setProgramName}
            programName={programName}
            saveProgram={() => this.saveDataAndClearState(programData, programName)}
          />
        </div>
      </ProgramContext.Provider>
    );
  }
}

export { ProgramContext };
