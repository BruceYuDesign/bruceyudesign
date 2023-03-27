import { isExist , updateData } from '~/server/db'
import { projectVerify } from '~/verify/project'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    projectVerify( data )

    for( let type of data.type ) {
        await isExist( 'projectType' , type )
    }

    return updateData( 'project' , id , {
        state:    data.state,
        imgs:     data.imgs,
        type:     data.type,
        title:    data.title,
        subtitle: data.subtitle,
        date:     data.date,
        linkName: data.linkName,
        linkHref: data.linkHref,
        desc:     data.desc
    })
})