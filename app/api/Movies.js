/**
 * Created by timothy on 23/11/16.
 */
import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getMovieById = (id) => {
    return fetch(`${ApiUrl}movie/${id}?api_key=${key}`).then(result => result.json());
};