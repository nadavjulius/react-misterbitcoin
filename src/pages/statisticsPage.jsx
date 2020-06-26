import React, { Component } from 'react';
import { Chart } from "react-google-charts";

import { bitcoinService } from '../services/BitcoinService';


export default class StatisticPage extends Component {
    state = {
        marketPrice: [],
        tradeVolume: [],
        mPRange: 6,
        cTRange: 6,
    }

    componentDidMount() {
        this.getMarketPrice()
        this.getTradeVolume()
    }

    getMarketPrice = async (months = 6) => {        
        const marketPrice = await bitcoinService.getMarketPrice(months)
        this.setState({ marketPrice: marketPrice })
        this.setState({ mPRange: months })
    }

    getTradeVolume = async (months = 6) => {
        const tradeVolume = await bitcoinService.getTradeVolume(months)
        this.setState({ tradeVolume: tradeVolume })
        this.setState({ cTRange: months })
    }

    getButtonsUsingMap = (func) => {
        const array = [1, 2, 3, 4, 5, 6]

        if (func === 0) {
            return array.map((number) => {
                return <button className="second-btn" onClick={() => this.getMarketPrice(number)}>{number}</button>
            })
        } else {
            return array.map((number) => {
                return <button className="second-btn" onClick={() => this.getTradeVolume(number)}>{number}</button>
            })
        }
    }

    render() {
        const {
            mPRange,
            cTRange,
            marketPrice,
            tradeVolume
        } = this.state

        return (
            <div className="statistics-page">
                <h3 className="statistics-page-quote"> Bitcoin is the first [encrypted money] that has
                the potential to do something like change the world.” – Peter Thiel
                    <img className="statistics-page-quote-img" src={require('../assets/imgs/petertheil.JPG')} />
                </h3>
                <section className="statistics-page-chart">
                    {
                        marketPrice.length &&
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            data={[['Date', 'USD'], ...marketPrice]}
                            options={{
                                title: `Market Price (USD) last ${mPRange} months`,
                                hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                                // For the legend to fit, we make the chart area smaller
                                chartArea: { width: '70%', height: '50%' },
                                colors: ['#15ca15']
                            }}

                        />
                    }
                    <section className="statistics-page-chart-btns">
                        {this.getButtonsUsingMap(0)}
                    </section>
                </section>
                <section className="statistics-page-chart">
                    {
                        tradeVolume.length &&
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            data={[['Date', 'USD'], ...tradeVolume]}
                            options={{
                                title: `Confirmed Transactions last ${cTRange} months`,
                                hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                                // For the legend to fit, we make the chart area smaller
                                chartArea: { width: '70%', height: '50%' },
                                colors: ['#15ca15']
                            }}
                        />}
                    <section className="statistics-page-chart-btns">
                        {this.getButtonsUsingMap(1)}
                    </section>
                </section>
                <img className="statistics-page-bottom-img" src={require('../assets/imgs/illustration-intro.png')} />
            </div>
        )
    }
}
