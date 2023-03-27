import { getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    return Promise.all([
        getDatas( 'projectType' , [ 'index' , 'text' ] ),
        getDatas( 'project' , [ 'state' , 'title' , 'subtitle' , 'date' , 'desc' , 'linkName' , 'linkHref' , 'imgs' , 'type' ] )
    ])
    .then( response => {
        return {
            projectType: response[ 0 ],
            project: response[ 1 ]
        }
    })
})