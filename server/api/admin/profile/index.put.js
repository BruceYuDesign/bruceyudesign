import { isUnique , updateData } from '~/server/db'
import { profileVerify } from '~/verify/profile'

export default defineEventHandler( async event => {
    // const uid = getCookie( event , 'uid' )
    const __session = JSON.parse( getCookie( event , '__session' ) )
    const uid = __session.uid
    const { data } = await readBody( event )

    profileVerify( data )
    await isUnique( 'user' , 'account' , data.account , uid )

    return updateData( 'user' , uid , {
        account: data.account,
        name:    data.name,
        avatar:  data.avatar
    })
})