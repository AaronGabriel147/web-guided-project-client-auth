import axios from 'axios';

// This will have to be imported in every file that needs it. IE import { axiosWithAuth } from './x';

// This whole file is about writing less code that is easier to read.
// So we wont have to type this a bunch of times:         headers: {
                                                       //   authorization: localStorage.getItem('token')
                                                       //
// See GasPrices.js for exact usage.

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({                       // sets up base information that is going to go into get/post/delete/etc requests. 
        baseURL: 'http://localhost:5000/api',   // this makes it so we do not have to type the url in every time! Less bugs!
        headers: {
            authorization: token,
        }
    })
}