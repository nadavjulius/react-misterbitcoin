export const storageService = {
    load,
    store
}

function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function load(key) { 
    return JSON.parse(localStorage.getItem(key));
}