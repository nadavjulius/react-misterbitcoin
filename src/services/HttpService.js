import Axios from 'axios';
var axios = Axios.create({
    withCredentials: false
});

export const httpService = {
    get(url, endpoint, data){
        return ajax(url, endpoint, 'GET', data);
    },
    post(url, endpoint, data){
        return ajax(url, endpoint, 'POST', data);
    },
    put(url, endpoint, data){
        return ajax(url, endpoint, 'PUT', data);
    },
    delete(url, endpoint, data){
        return ajax(url, endpoint, 'DELETE', data);
    }
}


async function ajax(url, endpoint = '', method='get', data=null) {
    try {
        const res = await axios({
            url: `${url}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log('Error: ', err)
    }
}

