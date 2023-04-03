import { updateData } from '~/server/db'

export default defineEventHandler( async event => {
    const __session = JSON.parse( getCookie( event , '__session' ) )
    const uid = __session.uid

    deleteCookie( event , '__session' )

    return updateData( 'user' , uid , {
        token:    null,
        tokenExp: null
    })
}) 