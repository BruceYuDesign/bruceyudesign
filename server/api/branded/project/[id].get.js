import { getData , getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = event.context.params

    return Promise.all([
        getDatas( 'projectType' , [ 'index' , 'text' ] ),
        getData( 'project' , id , [ 'state' , 'title' , 'subtitle' , 'date' , 'desc' , 'linkName' , 'linkHref' , 'imgs' , 'type' ] ),
        getDatas( 'project' , [ 'title' , 'subtitle' , 'imgs' ] , {
            state: { operator: '==' , value: true }
        })
    ])
    .then( response => {

        const projectType = response[ 0 ]
        let project  = response[ 1 ]
        let projects = response[ 2 ]

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

        for( let index in project.type ) {
            for( let type of projectType ) {
                project.type[ index ] = project.type[ index ].replace( type.id , type.text )
            }
        }

        projects = projects
            .filter( data => data.id !== id )
            .sort( ( a , b ) => a.date < b.date ? 1 : -1 )
            .slice( 0 , 5 )

        projects.map( data => data.imgs = data.imgs.filter( ({ page }) => page === 0 ) )

        return {
            project: project,
            projects: projects
        }
    }) 
})