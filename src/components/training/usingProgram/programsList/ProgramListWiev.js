import React from 'react';

const ProgramListWiew = ({
  programNames = [{ text: 'У вас немає програм.' }],
  openProgramInfo = () => {},
  renderFunc = () => {},
}) => (
  <div className="programList">
    <ul className="list-group">
      {programNames.map((name, i) => (
        <React.Fragment>
          {name.text ? (
            <li className="list-group-item list-group-item-success" key={i}>
              {name.text}
            </li>
          ) : (
            <li
              key={i + name}
              index={i}
              className="list-group-item list-group-item-success programList-item program"
              onClick={e => openProgramInfo(e, name)}
            >
              {renderFunc(name)}
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  </div>
);

export default ProgramListWiew;
