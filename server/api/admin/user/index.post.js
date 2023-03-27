import bcrypt from 'bcrypt'
import { isUnique , isExist , addData } from '~/server/db'
import { userVerify , userPasswordVerify } from '~/verify/user'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    userVerify( data )
    userPasswordVerify( data )

    await isUnique( 'user' , 'account' , data.account )
    await isExist( 'userAccess' , data.access )

    const passwordEncrypt = await bcrypt.hash( data.password , 10 )

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