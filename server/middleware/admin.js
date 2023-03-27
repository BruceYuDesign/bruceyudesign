import { getData } from '~/server/db'
import bcrypt from 'bcrypt'

export default eventHandler( async event => {
    // 是後台請求
    if( !event.path.startsWith( '/api/admin/' ) ) {
        return
    }

    // 尚未登入 --------------------------------------------------
    // const cookieToken = getCookie( event , 'token' )
    // const cookieUid   = getCookie( event , 'uid' )
    const __session = getCookie( event , '__session' )
    if( !__session ) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const parseSession = JSON.parse( __session )
    const cookieToken = parseSession.token
    const cookieUid   = parseSession.uid

    // 取得資料 --------------------------------------------------
    let user , userAccess
    try {
        user = await getData( 'user' , cookieUid , [ 'token' , 'tokenExp' , 'state' , 'access' ] )
        userAccess = await getData( 'userAccess' , user.access , [ 'access' ] )
    }
    catch {
        // deleteCookie( event , 'token' )
        // deleteCookie( event , 'uid' )
        deleteCookie( event , '__session' )
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid UID'
        })
    }

    // state 驗證 --------------------------------------------------
    const { state } = user
    // 帳號被停用
    if( !state ) {
        // deleteCookie( event , 'token' )
        // deleteCookie( event , 'uid' )
        deleteCookie( event , '__session' )
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden'
        })
    }

    // token 驗證 --------------------------------------------------
    const { token , tokenExp } = user
    const { access } = userAccess
    const isTokenValid = await bcrypt.compare( token , cookieToken )
    const isNotExpired = new Date( tokenExp ) >= new Date( Date.now() )
    // token 錯誤
    if( !isTokenValid || !isNotExpired ) {
        // deleteCookie( event , 'token' )
        // deleteCookie( event , 'uid' )
        deleteCookie( event , '__session' )
        throw createError({
            statusCode: 401,
            statusMessage: 'Token expired'
        })
    }

    // access 驗證 --------------------------------------------------
    if(
        event.path === '/api/admin/' ||
        event.path === '/api/admin/profile/'
    ) {
        return
    }
    const apiPath = event.path.match( /\/api\/admin\/(\w+)\// )[ 1 ]
    const apiMethod = event.node.req.method.toLowerCase()
    // access 不足
    if( !access[ apiPath ][ apiMethod ] ) {
        // deleteCookie( event , 'token' )
        // deleteCookie( event , 'uid' )
        deleteCookie( event , '__session' )
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden'
        })
    }
})