import { updateData } from '~/server/db'
import { projectTypesIndexVerify } from '~~/verify/projectType'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )
    projectTypesIndexVerify( data )

    data.map( projectType => {
        updateData( 'projectType' , projectType.id , {
            index: projectType.index
        })
    })

    return 'SUCCESS'
})