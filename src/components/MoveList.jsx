import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

function MoveList(props) {
    return (
        <div className="move-list-container container">
            <aside className="move-list">
                <h3 className="card-title">
                   <span>
                        {props.title}
                   </span>
                </h3>
                <ul>
                    {
                        props.moves.map(move => <li key={move._id}>
                            <p className="__sum"><span className="money">${move.amount.toFixed(2)}</span> | <span className="btc">&#8383; {(props.btcRate * move.amount).toFixed(6)}</span></p>
                            <p className="__to">To: {move.to}</p>
                            <p className="__at">
                                <Moment fromNow>{move.at}</Moment> | <Moment format='DD.MM.YYYY HH:mm:ss'>{move.at}</Moment>
                            </p>
                        </li>)
                    }
                </ul>
            </aside>
        </div>
    ); 
}

const mapStateToProps = (state) => {
    return {
      btcRate: state.user.btcRate
    }
}

export default connect(mapStateToProps)(MoveList);