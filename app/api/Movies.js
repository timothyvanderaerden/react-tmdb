import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getMovieById = (id) => {
    return fetch(`${ApiUrl}movie/${id}?api_key=${key}`).then(result => result.json());
};

export const getKeywordsForMovie = (id) => {
    return fetch(`${ApiUrl}movie/${id}/keywords?api_key=${key}`).then(result => result.json());
};

export const getCastForMovie = (id) => {
    return fetch(`${ApiUrl}movie/${id}/credits?api_key=${key}`).then(result => result.json());
};

export const getSimilarMovies = (id) => {
    return fetch(`${ApiUrl}movie/${id}/similar?api_key=${key}`).then(result => result.json());
};

export const getMovieReviews = (id) => {
    return fetch(`${ApiUrl}movie/${id}/reviews?api_key=${key}&language=en-US`).then(result => result.json());
};

export const getUpcomingMovies = () => {
    return fetch(`${ApiUrl}movie/upcoming?api_key=${key}`).then(result => result.json());
};