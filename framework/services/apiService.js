import http from "k6/http";
import { Rate } from "k6/metrics"
import { check } from 'k6';


// Check Failure Rate or Error Rate
let failureRate = new Rate('failure_rate');


export function getAll(endpoint, params) {
    let response = http.get(endpoint, params)

        //Add check
    let checkGetResponse = check(response, {
        'Get all crocodiles status is 200:': (r) => r.status === 200
    })

    failureRate.add(!checkGetResponse)

    const idList = []
    let result = JSON.parse(response.body)

    for(let i = 0; i < result.length; i++) {
        idList.push(result[i].id)     
    }
    return idList
}

export function getById(endpoint, id, params) {
    let response = http.get(endpoint, id, params)

    let checkGetByIdResponse = check(response, {
        'Get crocodile status is 200:': (r) => r.status === 200
    })

    failureRate.add(!checkGetByIdResponse)
}