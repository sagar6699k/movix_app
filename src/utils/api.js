import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN
const API_KEY = process.env.REACT_APP_API_KEY

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
    Accept: "application/json"
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${url}`, {
            headers,
            params
        })
        return data;
    } catch (error) {
        console.log("Error", error);
        return error;
    }
}
// export const fetchDataFromApiUsingKey = async (url, params) => {
//     try {
//         const { data } = await axios.get(`${BASE_URL}/${url}?api_key=${API_KEY}`)
//         return data;
//     } catch (error) {
//         console.log("Error", error);
//         return error;
//     }
// }