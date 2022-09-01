import * as apiService from '../utility/apiService.js'
import * as env from '../../env.js'
import http from 'k6/http'


export let options = {
    vus : `${env.TG1_VU}`,
    duration: `${env.TG1_DURATION}`,
    iterations: `${env.TG1_ITERATION}`
}

export default function() {
    const endPoint = "/public/crocodiles/"
    let params = "?format=json"
    let headerParam = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    //console.log(`${env.devEnvironment}`, endPoint, params)

    //const req = http.get(`${env.devEnvironment}`, endPoint, params)

    apiService.get(`${env.devEnvironment}`+endPoint+params, headerParam)    
    apiService.getById(`${env.devEnvironment}`+endPoint+params, "1", headerParam)
}