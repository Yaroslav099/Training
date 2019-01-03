import React, { Component } from 'react';
import ModalAmountOfReps from './ModalAmountOfReps';

class AmountOfReps extends Component {
  state = {
    isModalShown: false,
  };

  showHideModal = () => {
    this.setState(state => ({
      isModalShown: !state.isModalShown,
    }));
  };

  render() {
    const {
      name,
      activeExercise,
      changeActiveExercise,
      index,
      programDataLength,
      programData,
    } = this.props;
    const { isModalShown } = this.state;
    if (!isModalShown) {
      if (activeExercise === index) {
        return (
          <div className="amountOfReps" onClick={this.showHideModal}>
            Done!
          </div>
        );
      } else return null;
    } else
      return (
        <ModalAmountOfReps
          name={name}
          activeExercise={activeExercise}
          changeActiveExercise={changeActiveExercise}
          showHideModal={this.showHideModal}
          programDataLength={programDataLength}
          programData={programData}
        />
      );
  }
}

export default AmountOfReps;