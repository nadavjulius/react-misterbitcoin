import React, { Component } from 'react'
// import { contactService } from "../services/ContactService";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

import { getContactById } from '../store/actions/ContactAction';
import { addMove } from '../store/actions/UserActions';

import TransferFund from '../components/TransferFund';
import MoveList from '../components/MoveList';

class ContactDetails extends Component {
    state = {
        amount: 0
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getContactById(id);
    }

    onGoBackClickHandler = (ev) => {
        // this.props.history.go(-1);
        this.props.history.push('/contact');
    };

    handleChange = (amount) => {
        this.setState({ amount });
    }

    onTransferCoins = (ev) => {
        ev.preventDefault();

        if (this.props.user.coins - this.state.amount >= 0 && this.state.amount > 0) {
            this.props.addMove(this.props.contact, this.state.amount);

            const elToggle = document.querySelector('.move-list-toggle');
            if (elToggle) elToggle.classList.toggle('animate');

            setTimeout(() => {
                if (this.state.amount > this.props.user.coins) this.setState({ amount: this.props.user.coins });
            }, 0);
        }
        else Swal.fire({
            title: 'Oops',
            text: 'Transfer declined, invalid amount',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    get movesToContact() {
        return this.props.user.moves.filter(move => move.toId === this.props.contact._id);
    }

    render() {
        const { contact } = this.props;

        if (!contact) return (
            <div className="loading-wrap">
                <h2 className="loading-wrap-txt">Loading...</h2>
            </div>
        )

        return (
            <div className="contact-details">
                <button onClick={this.onGoBackClickHandler} className="contact-details-back-btn main-btn">Go Back</button>
                <h3 className="contact-details-name">{contact.name}</h3>
                <section className="contact-details-main card">
                    <img src={`https://robohash.org/${contact._id}?set=set5`} className="contact-details-main-avitar" />
                    <section className="contact-details-main-content">
                        <p className="contact-details-main-content-txt">
                            Phone: <a href={"tel:{contact.phone}"} className="contact-details-main-content-txt-a">{contact.phone}</a>
                        </p>
                        <p className="contact-details-main-content-txt">
                            Email: <a href={"mailto:{contact.email}?"} className="contact-details-main-content-txt-a">{contact.email}</a>
                        </p>
                    </section>
                    <NavLink to={'/contact/edit/' + this.props.contact._id} className="contact-details-main-edit">
                        <img src={require('../assets/imgs/pencil.png')} className="contact-details-main-edit-img" />
                    </NavLink>
                </section>
                <div className="contact-details-transactions">
                    <section className="contact-details-transactions-transfer card">
                        {
                            this.props.user.coins ?
                                <TransferFund
                                    onTransferCoins={this.onTransferCoins}
                                    handleChange={this.handleChange}
                                    amount={this.state.amount}
                                    maxCoins={this.props.user.coins}
                                />
                                :
                                null
                        }
                    </section>
                    <section className="contact-details-transactions-moves card">
                        {(this.movesToContact.length) ? <MoveList title={`Your moves to ${this.props.contact.name}`} moves={this.movesToContact} /> : ''}
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contact: state.contact.currContact,
        user: state.user.loggedUser
    }
}
const mapDispatchToProps = {
    getContactById,
    addMove
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);