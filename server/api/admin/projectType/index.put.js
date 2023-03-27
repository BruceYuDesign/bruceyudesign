import { updateData } from '~/server/db'
import { projectTypeVerify } from '~~/verify/projectType'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )
    projectTypeVerify( data )
    return updateData( 'projectType' , id , {
        text: data.text
    })
})