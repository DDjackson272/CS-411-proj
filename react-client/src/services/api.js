import axios from "axios";

export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}
// A wrapper around axios API call that formats errors, etc
// method: the HTTP verb you want to use
// path: the route path/endpoint
// data: (optional) data in JSON form for POST requests
// return created Promise instance
export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
            .then(res => resolve(res.data))
            .catch(err => reject(err.response.data.error))
    });
}