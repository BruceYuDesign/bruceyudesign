import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware( async ( to , from ) => {

    if( !to.path.startsWith( '/admin/' ) ) {
        return
    }

    const { auth , fetchAuth } = useAuthStore()

    if( !auth.profile || !auth.access ) {
        return await fetchAuth()
    }
})