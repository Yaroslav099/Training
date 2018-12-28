import React, { Component } from 'react';
import ProgramsListItem from './ProgramsListItem';
import ProgramName from './ProgramName';

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
          <button type="button" className="btn btn-success" onClick={saveProgram}>
            Save
          </button>
        </ul>
      </div>
    );
  }
}
export default ProgramsList;
