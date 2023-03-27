import { getDatas , updateData } from '~/server/db'
import bcrypt from 'bcrypt'

// token產生器
function createToken() {
    const rand = () => Math.random().toString( 36 ).substr( 2 )
    return rand() + rand()
}

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 查詢帳號
    const snapshot = await getDatas( 'user' , [ 'password' , 'access' , 'state' ] , {
        account: { operator: '==' , value: data.account }
    })

    // 無此帳號
    if( snapshot.length === 0 ) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid account'
        })
    }

    // 驗證密碼
    const user = snapshot[ 0 ]
    const isVerify = await bcrypt.compare( data.password , user.password )

    // 密碼錯誤
    if( !isVerify ) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Password error'
        })
    }

    // 帳號被停用
    const isEnable = user.state
    if( !isEnable ) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Account disabled'
        })
    }

    // 產生token
    const token = createToken()
    const tokenEncrypt = await bcrypt.hash( token , 10 )
    const expires = new Date( Date.now() + 10000 * 60 * 60 * 24 * 1 )
    const option = {
        httpOnly: true,
        expires: expires,
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    }

    // 傳送uid、token到前端
    const __session = JSON.stringify({
        uid: user.id,
        token: tokenEncrypt
    })
    setCookie( event , '__session' , __session  , option )
    // setCookie( event , 'uid'   , user.id      , option )
    // setCookie( event , 'token' , tokenEncrypt , option )

    // token寫入資料庫
    await updateData( 'user' , user.id , {
        token:    token,
        tokenExp: expires.toString()
    })

    return 'SUCCESS'
})