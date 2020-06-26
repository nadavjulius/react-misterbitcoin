import React from 'react';
import { connect } from 'react-redux';

import { contactService } from '../services/ContactService';
import { getContactById } from '../store/actions/ContactAction';
import { saveContact } from '../store/actions/ContactAction';
import { removeContact } from '../store/actions/ContactAction';

import defaultUser from '../assets/imgs/unknown.png';

class ContactEdit extends React.Component {
    state = {
        contact: contactService.getEmptyContact()
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            await this.props.getContactById(id);
            this.setState({ contact: { ...this.props.contact } });
        }
    }

    handleChange = (ev) => {
        this.setState({ contact: { ...this.state.contact, [ev.target.name]: ev.target.value } });
    }

    saveContact = (ev) => {
        ev.preventDefault();
        this.props.saveContact({ ...this.state.contact });
        const { id } = this.props.match.params;
        if (id) {
            this.props.history.push(`/contact/${id}`);
        } else {
            this.props.history.push(`/contact`);
        }
    }

    onRemoveContact = async () => {
        await this.props.removeContact(this.props.contact._id);
        this.props.history.push('/contact');
    }

    render() {
        return (
            <section className="contact-edit">
                    <nav className="contact-edit-nav">
                        <button onClick={() => { this.props.history.goBack() }} className="contact-edit-nav-link main-btn">
                            Back
                        </button>
                    </nav>
                    <main>
                        <div className="contact-edit-card card">
                            <img src={(this.state.contact._id) ? `https://robohash.org/${this.state.contact._id}?set=set5` : defaultUser} alt="contact" className="contact-edit-card-avitar"/>
                            <form onSubmit={this.saveContact} className="contact-edit-card-inputs">
                                <input id="gg" type="text" placeholder="Full Name" name="name" value={this.state.contact.name} onChange={this.handleChange} required />
                                <input type="tel" placeholder="Phone" name="phone" value={this.state.contact.phone} onChange={this.handleChange} required />
                                <input type="email" placeholder="Email" name="email" value={this.state.contact.email} onChange={this.handleChange} required />
                                <button className="contact-edit-card-inputs-save main-btn">Save</button>
                            </form>
                                {
                                    this.props.match.params.id &&
                                    <button onClick={this.onRemoveContact} 
                                    className="contact-edit-card-inputs-delete main-btn"> Delete </button>
                                }
                        </div>
                    </main>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contact: state.contact.currContact
    }
}
const mapDispatchToProps = {
    getContactById,
    saveContact,
    removeContact
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);