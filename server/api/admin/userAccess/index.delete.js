import { clearField , deleteData } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )

    await clearField( 'user' , 'access' , id )

    return deleteData( 'userAccess' , id )
})