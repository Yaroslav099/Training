import React from 'react';

const ProgramName = ({ setProgramName, programName }) => (
  <input
    type="text"
    className="form-control"
    placeholder="Введіть назву програми"
    aria-label="Username"
    aria-describedby="basic-addon1"
    onChange={e => setProgramName(e)}
    value={programName}
  />
);

export default ProgramName;
