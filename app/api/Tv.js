import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getTvShowById = (id) => {
    return fetch(`${ApiUrl}tv/${id}?api_key=${key}`).then(result => result.json());
};

export const getKeywordsForTvShow = (id) => {
    return fetch(`${ApiUrl}tv/${id}/keywords?api_key=${key}`).then(result => result.json());
};

export const getCastForTvShow = (id) => {
    return fetch(`${ApiUrl}tv/${id}/credits?api_key=${key}`).then(result => result.json());
};

export const getSimilarTvShows = (id) => {
    return fetch(`${ApiUrl}tv/${id}/similar?api_key=${key}`).then(result => result.json());
};