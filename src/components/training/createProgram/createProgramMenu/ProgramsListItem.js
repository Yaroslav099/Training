import React, { Component } from 'react';
import ProgramsLisItemSelect from './ProgramsListItemSelect';
import DeleteBtn from './deleteBtn';

class ProgramsListItem extends Component {
  render() {
    const { name, index, setData, programData } = this.props;
    return (
      <li className="list-group-item list-group-item-success">
        <span className="exerciseNane">{name}</span>
        <ProgramsLisItemSelect
          type="weight"
          setData={setData}
          index={index}
          programData={programData}
        />
        <ProgramsLisItemSelect
          type="reps"
          setData={setData}
          index={index}
          programData={programData}
        />
        <DeleteBtn index={index} name={name} />
      </li>
    );
  }
}

export default ProgramsListItem;
