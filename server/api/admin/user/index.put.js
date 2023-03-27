import { isUnique , isExist , updateData } from '~/server/db'
import { userVerify } from '~/verify/user'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    userVerify( data )

    await isUnique( 'user' , 'account' , data.account , id )
    await isExist( 'userAccess' , data.access )

    return updateData( 'user' , id , {
        state:   data.state,
        account: data.account,
        name:    data.name,
        avatar:  data.avatar,
        access:  data.access
    })
})