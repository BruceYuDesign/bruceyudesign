import bcrypt from 'bcrypt'
import { getData , updateData } from '~/server/db'
import { profilePasswordVerify } from '~/verify/profile'

export default defineEventHandler( async event => {
    // const uid = getCookie( event , 'uid' )
    const __session = JSON.parse( getCookie( event , '__session' ) )
    const uid = __session.uid
    const { data } = await readBody( event )

    profilePasswordVerify( data )
    const oldPassword = data.old
    const newPassword = data.new

    // 驗證密碼
    const user = await getData( 'user' , uid , [ 'password' ] )
    const isVerify = await bcrypt.compare( oldPassword , user.password )
    if( !isVerify ) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Password error'
        })
    }

    // 更新密碼
    const passwordEncrypt = await bcrypt.hash( newPassword , 10 )
    return updateData( 'user' , uid , {
        password: passwordEncrypt
    })
})