import React from 'react';
import ContactPreview from './contactPreview';

export default (props) => {
  return (
    <div className="contact-list">
      {props.contacts.map((contact) => (
          <ContactPreview contact={contact}  key={contact._id} />
      ))}
    </div>
  );
};
