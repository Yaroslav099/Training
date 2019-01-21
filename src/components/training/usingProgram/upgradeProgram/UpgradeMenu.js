import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FbServices, { FbRefs } from '../../../../firebase-services';
import { isLoggedIn } from '../../../hoc-helpers';
import UpgradeInput from './UpgradeInput';
import UpgradeMenuWiew from './UpgradeMenuWiew';
import PageNotFound from '../../../routeErr/PageNotFound';
const { fbProgramRef } = new FbRefs();
const { upgradeProgram, getSpecificProgramData } = new FbServices();

class UpgradeMenu extends Component {
  state = {
    newData: [{ weight: 0, reps: 0 }],
    programData: [],
  };

  onSave = () => {
    const { weight, reps } = this.state.newData[0];
    const { programData } = this.state;
    const {
      history,
      match: {
        params: { name },
      },
      location: { pathname },
    } = this.props;
    const newPath = pathname.slice(0, -9);

    upgradeProgram(programData, name, () => {
      history.push(newPath);
    });
  };

  upgradeSomeValueInData = (e, index, type) => {
    const { programData } = this.state;
    let value = e.target.value;
    programData[index][type] = value;

    this.setState({ programData });
  };

  renderFunc = (index, type) => (
    <span className="specificProgram-weight">
      {type}:{' '}
      <UpgradeInput
        value={this.state.programData[index][type]}
        type={type}
        index={index}
        upgradeSomeValueInData={this.upgradeSomeValueInData}
      />
    </span>
  );

  componentDidMount() {
    const {
      match: {
        params: { name },
      },
    } = this.props;
    getSpecificProgramData(fbProgramRef, name, programData => {
      this.setState({ programData });
    });
  }

  render() {
    const { programData } = this.state;
    if (programData === null) return <PageNotFound />;
    return (
      <UpgradeMenuWiew
        renderFunc={this.renderFunc}
        programData={programData}
        onSave={this.onSave}
      />
    );
  }
}

export default withRouter(isLoggedIn(UpgradeMenu));
