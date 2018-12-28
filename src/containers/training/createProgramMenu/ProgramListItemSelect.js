import React, { Component } from 'react';
import ProgramsLisItemSelectWiev from '../../../components/training/createProgram/createProgramMenu/ProgramsListItemSelectWiev';

const ProgramsLisItemSelect = ProgramsLisItemSelectWiev =>
  class extends Component {
    componentDidUpdate = (prevProps, prevState) => {
      // if (prevState !== this.state) {
      //   const { setSelectData, type } = this.props;
      //   const { data } = this.state;
      //   setSelectData(data, type);
      // }
    };

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
