import React from 'react';
import { NavLink } from 'react-router-dom';

export default (props) => {
    return (
        <nav className="main-nav">
            <NavLink activeClassName="active-logo" exact to="/">
                <img src={require('../assets/imgs/logo.png')} className="main-nav-logo" title="HOME"/>
            </NavLink>
            <NavLink activeClassName="active" exact to="/contact">Contacts</NavLink>
            <NavLink activeClassName="active" exact to="/stats">Statistics</NavLink>
        </nav>
    )
}