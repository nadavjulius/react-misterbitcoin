import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadContacts, sortContacts, shuffleContacts } from '../store/actions/ContactAction';

import ContactList from '../components/contactList';
import ContactFilter from '../components/contactFilter';


class ContactPage extends Component {

    doFilter = async (ev) => {
        const criteria = {
            [ev.target.name]: ev.target.value
        };
        this.props.loadContacts(criteria);
    }

    render() {
        return (
            <div className="contacts-page">
                <ContactFilter doFilter={this.doFilter}/>
                <ContactList contacts={this.props.contacts} />
            </div>
        );
    }

}

const mapStateToProps = (state)=> { 
    return {
      contacts: state.contact.contacts
    }
}
const mapDispatchToProps = {
    loadContacts,
    sortContacts,
    shuffleContacts
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);