import { updateData } from '~/server/db'

export default defineEventHandler( async event => {
    const __session = JSON.parse( getCookie( event , '__session' ) )
    const uid = __session.uid

    // 刪除cookie
    deleteCookie( event , '__session' )

    // 更新狀態
    return updateData( 'user' , uid , {
        token:    null,
        tokenExp: null
    })
}) 