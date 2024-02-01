import {streamsInstance} from './axios'

export const topStreams=()=>streamsInstance.get('/')