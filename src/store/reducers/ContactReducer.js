import { contactService } from '../../services/ContactService';

const initialState = {
    contacts: [],
    currContact: null
}
let isDesc = false;

export default function ContactReducer(state = initialState, action) {
    switch (action.type) {
            case 'SET_CONTACTS':
                return { ...state, contacts: action.contacts };

            case 'SET_CONTACT':
                return { ...state, currContact: action.contact };

            case 'ADD_CONTACT':
                return { ...state, contacts: [ ...state.contacts, action.contact ] };

            case 'UPDATE_CONTACT':
                return { ...state, contacts: state.contacts.map(contact => {
                    if (contact._id === action.contact._id) return action.contact;
                    return contact;
                }) };

            case 'REMOVE_CONTACT':
                return { ...state, contacts: state.contacts.filter(contact => contact._id !== action.id) };

            case 'SORT_CONTACTS':
                const newContacts = [ ...state.contacts.sort((a, b) => {
                    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                      return -1;
                    }
                    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                      return 1;
                    }
                
                    return 0;
                  }) ];
                if (isDesc) newContacts.reverse();
                isDesc = !isDesc;
                return { ...state, contacts: newContacts };

            case 'SHUFFLE_CONTACTS': 
                return { ...state, contacts: [ ...contactService.shuffle(state.contacts) ] };

            default:
                return state;
    }
}