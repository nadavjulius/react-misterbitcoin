import React, { Component } from 'react';
import { connect } from 'react-redux'

import { bitcoinService } from '../services/BitcoinService';



class Home extends Component {

    state = {
        bitcoinRate: null
    }

    async componentDidMount() {
        const btcRate = await bitcoinService.getRate(this.props.user.coins);
        this.setState({ bitcoinRate: btcRate });
    }

    async getRate() {
        const bitcoinRate = await bitcoinService.getRate()
        this.setState({ bitcoinRate })
    }

    get username() {
        return this.props.user.name.charAt(0).toUpperCase() + this.props.user.name.slice(1);
    }
    get coins() { 
        return (this.props.user.coins.toFixed(2));
    }

    capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    bitcoinToUSDRate(num) {
        const rateUSD = num / this.state.bitcoinRate
        return '$' + rateUSD.toLocaleString()
    }

    render() {
        const { bitcoinRate } = this.state;

        if (!this.username || !bitcoinRate) return (
            <div className="loading-wrap">
                <h2 className="loading-wrap-txt">Loading...</h2>
            </div>
        )

        return (
            <div className="home-container">
                <h2>Welcome {this.capitalizeFirstLetter(this.username)}!</h2>
                <main className="home-container-main">
                    <section className="home-container-main-data">
                        <section className="card home-container-main-data-balance">
                            <p className="card-title">Balance</p>
                            <p className="card-p">BIT: {this.coins}</p>
                            <p className="card-p">USD: {this.bitcoinToUSDRate(this.coins)}</p>
                            <img className="home-container-main-data-balance-img" src={require('../assets/imgs/wallet.png')} />
                        </section>
                        <section className="card home-container-main-data-rates">
                            <p className="card-title">Rates</p>
                            {{ bitcoinRate } && <p className="card-p">USD to BTC is: {bitcoinRate}</p>}
                            {{ bitcoinRate } && <p className="card-p">BTC to USD is: {this.bitcoinToUSDRate(1)}</p>}
                            <img className="home-container-main-data-rates-img" src={require('../assets/imgs/growth-chart.png')} />
                        </section>
                    </section>
                    <section className="card home-container-main-bank">
                        <p className="card-title">Manage Account</p>
                        <img className="home-container-main-bank-img" src={require('../assets/imgs/bitcoin.png')} />
                        <button className="main-btn">Sell Coins (transfer to bank)</button>
                        <button className="main-btn">Buy Coins</button>
                    </section>
                </main>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        user: state.user.loggedUser
    }
}

export default connect(mapStateToProps, null)(Home);