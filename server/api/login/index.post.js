import { v4 as createToken } from 'uuid'
import { httpStatusCodes } from '~/server/httpStatusCodes'
import { getDatas , updateData } from '~/server/db'
import bcrypt from 'bcrypt'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 查詢帳號
    const snapshot = await getDatas( 'user' , [ 'password' , 'access' , 'state' ] , {
        account: { operator: '==' , value: data.account }
    })

    // 無此帳號
    if( snapshot.length === 0 ) {
        throw createError( httpStatusCodes.INVALID_ACCOUNT )
    }

    // 驗證密碼
    const user = snapshot[ 0 ]
    const isVerify = await bcrypt.compare( data.password , user.password )

    // 密碼錯誤
    if( !isVerify ) {
        throw createError( httpStatusCodes.PASSWORD_ERROR )
    }

    // 帳號被停用
    const isEnable = user.state
    if( !isEnable ) {
        throw createError( httpStatusCodes.ACCOUNT_DISABLED )
    }

    // 產生token
    const token = createToken()
    const tokenEncrypt = await bcrypt.hash( token , 10 )
    const expires = new Date( Date.now() + 1000 * 60 * 60 * 24 * 1 )
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

    // token寫入資料庫
    await updateData( 'user' , user.id , {
        token:    token,
        tokenExp: expires.toString()
    })

    return 'SUCCESS'
})