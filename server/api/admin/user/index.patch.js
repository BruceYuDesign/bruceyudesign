import bcrypt from 'bcrypt'
import { updateData } from '~/server/db'
import { userPasswordVerify } from '~/verify/user'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    // 驗證密碼
    userPasswordVerify( data )

    // 密碼雜湊
    const passwordEncrypt = await bcrypt.hash( data.password , 10 )

    // 更新密碼
    return updateData( 'user' , id , {
        password: passwordEncrypt
    })
})