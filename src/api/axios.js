import axios from "axios";

import { API_URL_GAMES, API_URL_STREAMS, API_URL_CATEGORIES, APP_TOKEN, CLIENT_ID } from "./config";

const baseURLGames = API_URL_GAMES; 
const baseURLStreams = API_URL_STREAMS; 
const baseURLCategiroes = API_URL_CATEGORIES; 
const token = APP_TOKEN;
const clientId = CLIENT_ID;

const commonHeaders = {
  'Authorization': `Bearer ${token}`,
  'Client-Id': `${clientId}`,
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