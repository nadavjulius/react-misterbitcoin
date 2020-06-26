import { contactService } from '../../services/ContactService';

export function loadContacts(criteria = {}) {
    return async dispatch => {
        const contacts = await contactService.getContacts(criteria);
        dispatch({ type: 'SET_CONTACTS', contacts });
    }
}
export function getContactById(id) {
    return async dispatch => {
        const contact = await contactService.getContactById(id);
        dispatch({ type: 'SET_CONTACT', contact });
    }
}
export function saveContact(contact) {
    return async dispatch => {
        const isEdit = !!contact._id;
        contact = await contactService.saveContact(contact);
        dispatch({ type: (isEdit) ? 'UPDATE_CONTACT' : 'ADD_CONTACT', contact });
    }
}
export function removeContact(id) {
    return async dispatch => {
        await contactService.deleteContact(id);
        dispatch({ type: 'REMOVE_CONTACT', id });
    }
}
export function getNeigContact(id, diff) {
    return async dispatch => {
        const contact = await contactService.getNeigContact(id, diff);
        dispatch({ type: 'SET_CONTACT', contact });
    }
}
export function sortContacts() {
    return dispatch => {
        dispatch({ type: 'SORT_CONTACTS' });
    }
}
export function shuffleContacts() {
    return dispatch => {
        dispatch({ type: 'SHUFFLE_CONTACTS' });
    }
}