import { deleteData } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )
    return deleteData( 'project' , id )
})