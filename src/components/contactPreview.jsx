import React from 'react';
import { Link } from 'react-router-dom';

export default ({ contact }) => {
    return (
        <div className="contact-preview">
            <Link to={'/contact/' + contact._id} >
                <div className='contact-preview-wrap'>
                    <img src={`https://robohash.org/${contact._id}?set=set5`} className="contact-preview-wrap-avitar" />
                    <h3 className="contact-preview-wrap-name">{contact.name}</h3>
                </div>
            </Link>
        </div>
    );
}