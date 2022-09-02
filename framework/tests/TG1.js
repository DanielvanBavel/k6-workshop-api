import { group } from 'k6';

import * as apiService from '../services/apiService.js'
import * as Helper from '../helpers/Helper.js'
import * as env from '../../env.js'

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


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

export function handleSummary(data) {
    //let date = new Date().toLocaleDateString();

    return {
        "./framework/reports/summary.html": htmlReport(data),
    };
}