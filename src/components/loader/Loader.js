import React from 'react';

const Loader = ({ loading }) => {
  return (
    <div class="lds-css ng-scope">
      <div class="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
