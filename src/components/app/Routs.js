import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Program from '../training/createProgram/program/Program';
import ProgramList from '../training/usingProgram/programsList';
import SpecificProgram from '../training/usingProgram/specificProgram';
import Statistic from '../training/usingProgram/statistic/Statistic';
import ProgramInfo from '../training/usingProgram/programInfo/ProgramInfo';
import AuthForm from '../authentication/AuthForm';
import SignUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';
import Home from '../training/home';
import PageNotFound from '../routeErr/PageNotFound';
import { HistoryList, SpecificDayHistory } from '../training/usingProgram/history';
import { UpgradeMenu } from '../training/usingProgram/upgradeProgram';

const Routs = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/program" component={Program} />
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
    <Route exact path="/training/:name/statistic" render={match => <Statistic {...match} />} />
    <Route exact path="/training/program-info/:name" render={match => <ProgramInfo {...match} />} />
    <Route
      path="/training/program-info/:name/upgrade"
      render={match => <UpgradeMenu {...match} />}
    />
    <Route
      exact
      path="/training/program-info/:name/history"
      render={match => <HistoryList {...match} />}
    />

    <Route exact path="/training/program-info/:name/history/:id" component={SpecificDayHistory} />
    <Route exact path="/authentication/" component={AuthForm} />
    <Route exact path="/signUp/" component={SignUp} />
    <Route exact path="/signIn/" render={() => <SignIn />} />
    <Route exact path="/notFound" component={PageNotFound} />
    <Redirect to="/notFound" />
  </Switch>
);

export default Routs;
