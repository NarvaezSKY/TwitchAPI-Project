import {gamesInstance} from './axios'

export const topGames=()=>gamesInstance.get('/top')