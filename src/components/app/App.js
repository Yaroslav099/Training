import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import withAuth from './WithAuth';
import Header from '../header';
import Program from '../training/createProgram';
import ProgramList from '../training/usingProgram';
import SpecificProgram from '../training/usingProgram/SpecificProgram';
import Statistic from '../training/usingProgram/statistic/Statistic';
import ProgramInfo from '../training/usingProgram/programInfo/ProgramInfo';
import AuthForm from '../authentication/AuthForm';
import SignUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';

class App extends Component {
  render() {
    const { authUser, redirect } = this.props;
    return (
      <Router>
        <React.Fragment>
          {authUser ? <Header authUser={authUser} /> : null}
          {redirect ? <Redirect to="/authentication/" /> : null}

          <Route path="/program" component={Program} />
          <Route exact path="/training" component={ProgramList} />
          <Route
            exact
            path="/training/:name"
            render={({
              match: {
                params: { name },
              },
            }) => {
              return <SpecificProgram name={name} />;
            }}
          />
          <Route
            exact
            path="/training/:name/statistic"
            render={match => <Statistic {...match} />}
          />
          <Route path="/training/program-info/:name" render={match => <ProgramInfo {...match} />} />
          <Route path="/authentication/" component={AuthForm} />
          <Route path="/signUp/" component={SignUp} />
          <Route path="/signIn/" render={() => <SignIn />} />
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuth(App);
