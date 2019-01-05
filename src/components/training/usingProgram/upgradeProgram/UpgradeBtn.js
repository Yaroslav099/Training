import React from 'react';
import { withRouter } from 'react-router-dom';

const UpgradeBtn = ({ history, location }) => {
  const goToUpgradeMenu = () => {
    history.push(`${location.pathname}/upgrade/`);
  };

  return (
    <button class="btn btn-warning upgradeBtn" onClick={goToUpgradeMenu}>
      Upgrade
    </button>
  );
};

export default withRouter(UpgradeBtn);
