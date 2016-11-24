/**
 * Created by timothy on 24/11/16.
 */
import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getMovieGenres = () => {
    return fetch(`${ApiUrl}genre/movie/list?api_key=${key}`).then(result => result.json());
};

export const getTVGenres = () => {
    return fetch(`${ApiUrl}genre/tv/list?api_key=${key}`).then(result => result.json());
};