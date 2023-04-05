import { isUnique , updateData } from '~/server/db'
import { profileVerify } from '~/verify/profile'

export default defineEventHandler( async event => {
    const __session = JSON.parse( getCookie( event , '__session' ) )
    const uid = __session.uid
    const { data } = await readBody( event )

    // 資料驗證
    profileVerify( data )

    // 帳號不重複
    await isUnique( 'user' , 'account' , data.account , uid )

    // 更新資料
    return updateData( 'user' , uid , {
        account: data.account,
        name:    data.name,
        avatar:  data.avatar
    })
})