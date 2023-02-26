import * as api from './api.js';

let endpoints = {
    'loadAllIdeas': 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc'
}

export async function loadAllIdeas() {
    return api.get(endpoints.loadAllIdeas);
}