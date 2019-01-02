import React, { Component } from 'react';
import ProgramsListItem from './ProgramsListItem';
import ProgramName from './ProgramName';
import NoExercises from './NoExercises';

class ProgramsList extends Component {
  render() {
    const { setData, saveProgram, programData, programName, setProgramName } = this.props;
    return (
      <div className="createProgramMenuContainer">
        <ProgramName programName={programName} setProgramName={setProgramName} />
        <ul className="list-group">
          {programData.map(({ exerciseName }, index) => (
            <ProgramsListItem
              name={exerciseName}
              key={index}
              index={index}
              setData={setData}
              programData={programData}
            />
          ))}
          <NoExercises isExercise={programData[0]} />
          <button type="button" className="btn btn-success saveProgramBtn" onClick={saveProgram}>
            Save
          </button>
        </ul>
      </div>
    );
  }
}
export default ProgramsList;
