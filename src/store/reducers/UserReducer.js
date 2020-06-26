import { userService } from '../../services/UserService';

const initialState = {
    loggedUser: userService.getUser(),
    btcRate: 0
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOGGED_USER': 
            return { ...state, loggedUser: JSON.parse(JSON.stringify(action.user)) };
        
        case 'SET_RATE':
            return { ...state, btcRate: action.rate };
        default:
            return state;
    }
}