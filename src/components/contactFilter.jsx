import React from 'react';

import { NavLink } from 'react-router-dom'

function ContactFilter(props) {
    return (
        <section className="contact-filter">
            <input className="contact-filter-input" type="text" placeholder="&#x1F50D; Search Contacts" name="term" onChange={props.doFilter} />
            <NavLink to="/contact/edit" className="contact-filter-add main-btn" title="add contacts">
                <img src={require('../assets/imgs/plus.png')} className="contact-filter-add-img" />
            </NavLink>
        </section>
    );
}

export default ContactFilter;