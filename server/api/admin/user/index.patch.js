import bcrypt from 'bcrypt'
import { updateData } from '~/server/db'
import { userPasswordVerify } from '~/verify/user'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    userPasswordVerify( data )
    const passwordEncrypt = await bcrypt.hash( data.password , 10 )

    return updateData( 'user' , id , {
        password: passwordEncrypt
    })
})