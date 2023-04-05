import { isUnique , isExist , updateData } from '~/server/db'
import { userVerify } from '~/verify/user'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    // 驗證資料
    userVerify( data )

    // 帳號不重複
    await isUnique( 'user' , 'account' , data.account , id )
    // 帳號權限存在
    await isExist( 'userAccess' , data.access )

    // 更新資料
    return updateData( 'user' , id , {
        state:   data.state,
        account: data.account,
        name:    data.name,
        avatar:  data.avatar,
        access:  data.access
    })
})