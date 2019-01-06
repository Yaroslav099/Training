import React from 'react';

const UpgradeInput = ({ value, index, type, upgradeSomeValueInData }) => {
  return (
    <input
      type="text"
      value={value}
      className="upgradeInput"
      onChange={e => upgradeSomeValueInData(e, index, type)}
    />
  );
};

export default UpgradeInput;
