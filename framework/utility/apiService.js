import http from "k6/http";

export function get(endpoint, params) {
    let response = http.get(endpoint, params);
    console.log(response.body)
}

export function getById(endpoint, id, params) {
    let response = http.get(endpoint, id, params)
    console.log(response.body)
}