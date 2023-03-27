export default defineNuxtRouteMiddleware( async ( to , from ) => {
    if( process.client && to.path.startsWith( '/admin/' ) ) {
        document.getElementById( 'navbar' ).classList.remove( 'navbar-open' )
        document.getElementById( 'overlay' ).classList.remove( 'overlay-show' )
        document.body.style.overflow = 'overlay'
    }
})