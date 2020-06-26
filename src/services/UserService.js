import { storageService } from './StorageService';
import { utilService } from './UtilService';

const KEY = 'loggedUser';
var USER = storageService.load(KEY) || null;

export const userService = {
   getUser,
   signup,
   addMove
}

function getUser() {
    return USER;
}

function signup(name) {
    const newUser = {
        name,
        coins: 100,
        moves: []
      }
    USER = newUser;
    storageService.store(KEY, USER);
    return USER;
}

function addMove(contact, amount) {
    const move = {
        _id: utilService.makeId(),
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    };
    USER.moves.push(move);
    USER.coins -= amount;
    storageService.store(KEY, USER);
    return USER;
}