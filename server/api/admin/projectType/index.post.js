import { getDatas , addData } from '~/server/db'
import { projectTypeVerify } from '~~/verify/projectType'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )
    projectTypeVerify( data )
    const { length: projectTypeIndex } = await getDatas( 'projectType' )
    return addData( 'projectType' , {
        text:  data.text,
        index: projectTypeIndex
    })
})