import { useLoadStore } from '~/stores/isLoading'

async function fetchData( url , options ) {
    try {
        useLoadStore().isLoading = true
        const response = await $fetch( url , options )
        return response
    }
    catch( error ) {
        throw showError( error )
    }
    finally {
        useLoadStore().isLoading = false
    }
}
export default defineNuxtPlugin( () => {
    return {
        provide: {
            fetchData
        }
    }
})