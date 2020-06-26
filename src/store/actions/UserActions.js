import { userService } from '../../services/UserService';
import { bitcoinService } from '../../services/BitcoinService';

export function doSignUp(name) {
    return dispatch => {
        const user = userService.signup(name);
        dispatch({ type: 'SET_LOGGED_USER', user });
    }
}
export function addMove(contact, amount) {
    return dispatch => {
        const user = userService.addMove(contact, amount);
        dispatch({ type: 'SET_LOGGED_USER', user });
    }
}
export function getBtcRate() {
    return async dispatch => {
        const rate = await bitcoinService.getRate(1);
        dispatch({ type: 'SET_RATE', rate });
    }
}