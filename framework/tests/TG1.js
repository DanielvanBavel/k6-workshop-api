import { group } from 'k6';

import * as apiService from '../utility/apiService.js'
import * as env from '../../env.js'


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

    group('K6 public API', function () {
        const result = apiService.getAll(`${env.devEnvironment}`+endPoint+params, headerParam)
        const id = result[Math.floor(Math.random() * result.length)];
                
        apiService.getById(`${env.devEnvironment}`+endPoint+params, id, headerParam)
    });
}