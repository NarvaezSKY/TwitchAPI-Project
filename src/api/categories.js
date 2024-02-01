import {categoriesInstance} from './axios'

export const categories=(query)=>categoriesInstance.get(`?query=${query}`)