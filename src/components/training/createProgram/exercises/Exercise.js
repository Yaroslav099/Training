import React, { Component } from 'react';
import { ProgramContext } from '../Program';

export default class Exercise extends Component {
  render() {
    const { name } = this.props;
    return (
      <ProgramContext.Consumer>
        {context => (
          <div className="card cardContainer">
            <div className="card-body cardContainer-item" onClick={() => context.addExercise(name)}>
              {name}
            </div>
          </div>
        )}
      </ProgramContext.Consumer>
    );
  }
}
