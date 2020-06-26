import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { loadContacts } from './store/actions/ContactAction';
import { getBtcRate } from './store/actions/UserActions';

// cmps
import NavBar from './components/navBar.cmp.jsx'

//routes
import Home from './pages/home';
import ContactPage from './pages/contactPage';
import ContactDetails from './pages/contactDetails';
import StatisticsPage from './pages/statisticsPage';
import SignUp from './pages/SignUp';
import ContactEdit from './pages/contactEdit';

import PrivateRoute from './HOC/PrivateRoute';


const history = createBrowserHistory();

function App(props) {
  useEffect(() => {
    props.loadContacts();
    props.getBtcRate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        <main>
          <Switch>
            <Route path="/" exact  component={PrivateRoute(Home)} />
            <Route path="/contact" exact component={PrivateRoute(ContactPage)} />
            <Route path="/contact/edit/:id?" exact component={PrivateRoute(ContactEdit)} />
            <Route path="/contact/:id" exact component={PrivateRoute(ContactDetails)} />
            <Route path="/stats" exact component={PrivateRoute(StatisticsPage)} />
            <Route path="/signup" exact component={SignUp} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

const mapDispatchToProps = {
  loadContacts,
  getBtcRate
}

export default connect(null, mapDispatchToProps)(App);
