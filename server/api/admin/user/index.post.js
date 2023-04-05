import bcrypt from 'bcrypt'
import { isUnique , isExist , addData } from '~/server/db'
import { userVerify , userPasswordVerify } from '~/verify/user'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 驗證資料
    userVerify( data )
    // 驗證密碼
    userPasswordVerify( data )

    // 帳號不重複
    await isUnique( 'user' , 'account' , data.account )
    // 帳號權限存在
    await isExist( 'userAccess' , data.access )

    // 密碼雜湊
    const passwordEncrypt = await bcrypt.hash( data.password , 10 )

    // 新增帳號
    return addData( 'user' , {
        state:    data.state,
        account:  data.account,
        name:     data.name,
        avatar:   data.avatar,
        access:   data.access,
        password: passwordEncrypt,
        token:    null,
        tokenExp: null
    })
})