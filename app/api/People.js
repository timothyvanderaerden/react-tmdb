import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getPersonById = (id) => {
    return fetch(`${ApiUrl}person/${id}?api_key=${key}`).then(result => result.json());
};

export const getCombinedCredits = (id) => {
    return fetch(`${ApiUrl}person/${id}/combined_credits?api_key=${key}`).then(result => result.json());
};