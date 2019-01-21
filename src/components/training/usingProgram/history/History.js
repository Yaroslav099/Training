import React from 'react';

const History = ({ doneInfo, openHistory }) => {
  if (+doneInfo !== 0) {
    return (
      <button className="btn btn-primary" onClick={openHistory}>
        History
      </button>
    );
  } else return null;
};

export default History;
