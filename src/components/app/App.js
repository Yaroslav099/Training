import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header';
import Program from '../training/createProgram';
import ProgramList from '../training/usingProgram';
import SpecificProgram from '../training/usingProgram/SpecificProgram';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Header />

            <Route path="/program" component={Program} />
            <Route exact path="/training" component={ProgramList} />
            <Route
              path="/training/:name"
              render={({
                match: {
                  params: { name },
                },
              }) => {
                return <SpecificProgram name={name} />;
              }}
            />
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
