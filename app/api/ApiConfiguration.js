import {ApiUrl} from './ApiUrl';
import key from './ApiKey';

export const getConfigurations = () => {
    return fetch(`${ApiUrl}configuration?api_key=${key}`).then(result => result.json());
};