import { getData } from '~/server/db'
import { httpStatusCodes } from '~/server/httpStatusCodes'
import bcrypt from 'bcrypt'

export default eventHandler( async event => {
    // 是後台請求
    if( !event.path.startsWith( '/api/admin/' ) ) {
        return
    }

    // 尚未登入 --------------------------------------------------
    const __session = getCookie( event , '__session' )
    if( !__session ) {
        throw createError( httpStatusCodes.UNAUTHORIZED )
    }

    // 解析Session --------------------------------------------------
    let parseSession
    try {
        parseSession = JSON.parse( __session )
    }
    // 無效Session
    catch {
        throw createError( httpStatusCodes.INVALID_SESSION )
    }

    const cookieToken = parseSession.token
    const cookieUid   = parseSession.uid

    // 取得資料 --------------------------------------------------
    let user , userAccess
    try {
        user = await getData( 'user' , cookieUid , [ 'token' , 'tokenExp' , 'state' , 'access' ] )
        userAccess = await getData( 'userAccess' , user.access , [ 'access' ] )
    }
    catch {
        deleteCookie( event , '__session' )
        throw createError( httpStatusCodes.INVALID_UID )
    }

    // state 驗證 --------------------------------------------------
    const { state } = user
    // 帳號被停用
    if( !state ) {
        deleteCookie( event , '__session' )
        throw createError( httpStatusCodes.ACCOUNT_DISABLED )
    }

    // token 驗證 --------------------------------------------------
    const { token , tokenExp } = user
    const { access } = userAccess
    const isTokenValid = await bcrypt.compare( token , cookieToken )
    const isNotExpired = new Date( tokenExp ) >= new Date( Date.now() )
    // token 錯誤
    if( !isTokenValid || !isNotExpired ) {
        deleteCookie( event , '__session' )
        throw createError( httpStatusCodes.TOKEN_EXPIRED )
    }

    // access 驗證 --------------------------------------------------
    const ADMIN_PATHS = [
        '/api/admin/',
        '/api/admin/auth/',
        '/api/admin/profile/',
        '/api/admin/logout/'
    ]
    if( ADMIN_PATHS.includes( event.path ) ) {
        return
    }

    const apiPath = event.path.match( /\/api\/admin\/(\w+)\// )[ 1 ]
    const apiMethod = event.node.req.method.toLowerCase()
    // access 不足
    if( !access[ apiPath ][ apiMethod ] ) {
        deleteCookie( event , '__session' )
        throw createError( httpStatusCodes.FORBIDDEN )
    }
})