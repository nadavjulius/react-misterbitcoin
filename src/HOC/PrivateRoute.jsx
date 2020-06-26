import React from 'react';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

export default function PrivateRoute(Component) {
    class AuthComponent extends React.Component {
        render() {
            return (this.props.user) ? <Component { ...this.props } /> : <Redirect to="/signup" />;
        }
    }
    const mapStateToProps = (state) => { 
        return {
          user: state.user.loggedUser
        }
    }
    return connect(mapStateToProps, null)(withRouter(AuthComponent));
}