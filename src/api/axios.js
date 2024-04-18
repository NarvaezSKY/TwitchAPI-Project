import axios from "axios";

import { API_URL_GAMES, API_URL_STREAMS, API_URL_CATEGORIES } from "./config";

const baseURLGames = API_URL_GAMES; 
const baseURLStreams = API_URL_STREAMS; 
const baseURLCategiroes = API_URL_CATEGORIES; 

const commonHeaders = {
  'Authorization': 'Bearer 3t1eqk5wr79wl5sgjde1a42b26y8uc',
  'Client-Id': 'x5yldjqwunjs1nmcq7jjjp4g72vbqp',
};

// Top Games Instance
export const gamesInstance = axios.create({
  baseURL: baseURLGames,
  headers: commonHeaders,
});

// Top Streams Instance
export const streamsInstance = axios.create({
  baseURL: baseURLStreams,
  headers: commonHeaders,
});

// Game & Categories Instance
export const categoriesInstance = axios.create({
  baseURL: baseURLCategiroes,
  headers: commonHeaders,
});