/**
 * Created by timothy on 23/11/16.
 */
import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getPopularMovies = () => {
    return fetch(`${ApiUrl}discover/movie?api_key=${key}&sort_by=popularity.desc`).then(result => result.json());
};

export const getPopularShows = () => {
    return fetch(`${ApiUrl}discover/tv?api_key=${key}&sort_by=popularity.desc`).then(result => result.json());
};