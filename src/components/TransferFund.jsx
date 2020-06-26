import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

function TransferFund(props) {
    return (
        <section className="transfer-fund">
            <form onSubmit={props.onTransferCoins}>
                <label>
                    <InputRange className="range" name="amount" minValue={0} maxValue={props.maxCoins} onChange={props.handleChange} value={props.amount} required />
                </label>
                <button className="main-btn">Transfer</button>
            </form>
        </section>
    );
} 

export default TransferFund;