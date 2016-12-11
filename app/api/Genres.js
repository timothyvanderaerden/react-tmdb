import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getMovieGenres = () => {
    return fetch(`${ApiUrl}genre/movie/list?api_key=${key}&language=en-US`).then(result => result.json());
};

export const getTVGenres = () => {
    return fetch(`${ApiUrl}genre/tv/list?api_key=${key}&language=en-US`).then(result => result.json());
};