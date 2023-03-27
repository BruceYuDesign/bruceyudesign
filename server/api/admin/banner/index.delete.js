import { resetSort , deleteData } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )
    await resetSort( 'banner' , 'index' , id )
    return deleteData( 'banner' , id )
})