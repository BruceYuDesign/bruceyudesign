import { fetchData } from './fetchData'

export default defineNuxtPlugin( () => {
    return {
        provide: {
            fetchData
        }
    }
})