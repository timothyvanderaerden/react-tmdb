/**
 * Created by timothy on 5/12/16.
 */
import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const searchMovies = (query) => {
    return fetch(`${ApiUrl}search/movie?api_key=${key}&query=${query}`).then(result => result.json());
};

export const searchKeyword = (query) => {
    return fetch(`${ApiUrl}search/keywords?api_key=${key}&query=${query}`).then(result => result.json());
};

export const searchPerson = (query) => {
    return fetch(`${ApiUrl}search/person?api_key=${key}&query=${query}`).then(result => result.json());
};

export const searchTVShow = (query) => {
    return fetch(`${ApiUrl}search/tv?api_key=${key}&query=${query}`).then(result => result.json());
};

export const searchMulti = (query) => {
    return fetch(`${ApiUrl}search/multi?api_key=${key}&query=${query}`).then(result => result.json());
};