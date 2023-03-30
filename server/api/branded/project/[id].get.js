import { getData , getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = event.context.params

    return Promise.all([
        getDatas( 'projectType' , [ 'index' , 'text' ] ),
        getData( 'project' , id , [ 'state' , 'title' , 'subtitle' , 'date' , 'desc' , 'linkName' , 'linkHref' , 'imgs' , 'type' ] ),
        getDatas( 'project' , [ 'title' , 'subtitle' , 'imgs' , 'date' ] , {
            state: { operator: '==' , value: true }
        })
    ])
    .then( response => {

        const projectType = response[ 0 ]
        const project  = response[ 1 ]
        const projects = response[ 2 ].filter( data => data.id !== id )

        if( !project ) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found'
            })
        }

        if( !project.state ) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Forbidden'
            })
        }

        project.type = project.type.map( typeId => {
            const type = projectType.find( ({ id }) => id === typeId )
            return type ? type.text : typeId
        })

        projects.sort( ( a , b ) => a.date < b.date ? 1 : -1 )
        projects.splice( 5 )
        projects.forEach( data => data.imgs = data.imgs.filter( ({ page }) => page === 0 ) )

        return {
            project: project,
            projects: projects
        }
    }) 
})