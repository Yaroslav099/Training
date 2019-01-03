import React, { Component } from 'react';
import ProgramsLisItemSelectWiev from '../../../components/training/createProgram/createProgramMenu/ProgramsListItemSelectWiev';

const ProgramsLisItemSelect = ProgramsLisItemSelectWiev =>
  class extends Component {
    render() {
      const { type, index, setData, programData } = this.props;
      return (
        <ProgramsLisItemSelectWiev
          type={type}
          index={index}
          setData={setData}
          programData={programData}
        />
      );
    }
  };

export default ProgramsLisItemSelect(ProgramsLisItemSelectWiev);
