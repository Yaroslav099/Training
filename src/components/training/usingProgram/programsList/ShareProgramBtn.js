import React from 'react';
import FbServices from '../../../../firebase-services';

const { addProgramToHomePage, getSpecificProgramData, fbProgramRef } = new FbServices();

const ShareProgramBtn = ({ name }) => {
  const shareProgramToHomePage = () => {
    getSpecificProgramData(fbProgramRef, name, data => {
      const dataWithKeys = data.map(el => {
        el.key = el.exerciseName;
        return el;
      });
      console.log(dataWithKeys);
      addProgramToHomePage(name, dataWithKeys);
    });
  };

  return (
    <button class="btn btn-primary" onClick={shareProgramToHomePage}>
      Share
    </button>
  );
};

export default ShareProgramBtn;
