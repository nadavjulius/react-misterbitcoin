import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import home from './pages/home';
import ContactPage from './pages/contactPage';
import ContactDetails from './pages/contactDetails';
import StatisticsPage from './pages/statisticsPage';

function RoutePage() {

  return (
    <div className="router-page">
      <main>
        <Switch>
          <Route path="/home"  component={home} />
          <Route path="/contact"  component={ContactPage} />
          <Route path="/contact/:id"  component={ContactDetails} />
          <Route path="/stats"  component={StatisticsPage} />
        </Switch>
      </main>
    </div>
  )
}



