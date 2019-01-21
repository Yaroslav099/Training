import React, { Component } from 'react';
import Loader from '../../../loader';

export default class UpgradeMenuWiew extends Component {
  render() {
    const { renderFunc, programData, onSave } = this.props;
    if (programData[0] !== undefined) {
      return (
        <div className="specificProgram">
          <h4 className="specificProgram-info">
            Для того щоб змінити вагу або повтори нажміть на цифру
          </h4>
          <ul className="list-group specificProgram-ul">
            {programData.map(({ exerciseName, reps }, index) => (
              <li className="list-group-item list-group-item" key={index + exerciseName}>
                <span className="specificProgram-name">{exerciseName}</span>
                <span className="specificProgram-li_dataContainer">
                  {renderFunc(index, 'weight')}
                  {renderFunc(index, 'reps')}
                </span>
              </li>
            ))}
            ;
          </ul>

          <button className="btn btn-success saveUpgradeBtn" onClick={onSave}>
            Save
          </button>
        </div>
      );
    } else return <Loader />;
  }
}
