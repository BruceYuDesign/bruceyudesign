import { resetSort , removeItem , deleteData } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )

    await resetSort( 'projectType' , 'index' , id )
    await removeItem( 'project' , 'type' , id )

    return deleteData( 'projectType' , id )
})