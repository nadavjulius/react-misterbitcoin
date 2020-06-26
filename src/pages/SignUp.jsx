import React from 'react';
import { connect } from 'react-redux';

import { doSignUp } from '../store/actions/UserActions';

class SignUp extends React.Component {
    state = {
        name: ''
    }

    handleChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value });
    }

    doSignUp = (ev) => {
        ev.preventDefault();
        this.props.doSignUp(this.state.name);
        this.props.history.push('/');
    }

    render() {
        return (
            <section className="sign-up container">
                <h2>Please enter your name</h2>
                <form onSubmit={this.doSignUp}>
                    <input type="text" placeholder="Name" name="name" onChange={this.handleChange} required id="signupInp" />
                    <label htmlFor="signupInp">Name</label>
                    <button>Sign Up!</button>
                </form>
            </section>
        );
    }
}

const mapDispatchToProps = {
    doSignUp
}

export default connect(null, mapDispatchToProps)(SignUp);