import React from 'react';
import FbServices, { FbRefs } from '../../../../firebase-services';

const { addProgramToHomePage, getSpecificProgramData } = new FbServices();
const { fbProgramRef } = new FbRefs();

const ShareProgramBtn = ({ name }) => {
  const shareProgramToHomePage = () => {
    getSpecificProgramData(fbProgramRef, name, data => {
      if (data) {
        const dataWithKeys = data.map(el => {
          el.key = el.exerciseName;
          return el;
        });
        addProgramToHomePage(name, dataWithKeys);
      }
    });
  };

  return (
    <button className="btn btn-primary shareBtn" onClick={shareProgramToHomePage}>
      Share
    </button>
  );
};

export default ShareProgramBtn;
