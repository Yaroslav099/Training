import React from 'react';
import FbServices from '../../../../firebase-services';

const { addProgramToHomePage, getSpecificProgramData, fbProgramRef } = new FbServices();

const ShareProgramBtn = ({ name }) => {
  const shareProgramToHomePage = () => {
    getSpecificProgramData(fbProgramRef, name, data => {
      addProgramToHomePage(name, data);
    });
  };

  return (
    <button class="btn btn-primary" onClick={shareProgramToHomePage}>
      Share
    </button>
  );
};

export default ShareProgramBtn;
