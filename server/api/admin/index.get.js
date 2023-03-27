import { getData , getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    return Promise.all([
        getData( 'bannerOption' , 'bannerOption' , [ 'timing' ] ),
        getDatas( 'banner' , [ 'use' , 'tool' , 'img' , 'gradient' , 'index' ] ),
        getDatas( 'projectType' , [ 'index' , 'text' ] ),
        getDatas( 'project' , [ 'state' , 'type' ] )
    ])
    .then( response => {
        return {
            bannerOption: response[ 0 ],
            banner:       response[ 1 ],
            projectType:  response[ 2 ],
            project:      response[ 3 ]
        }
    })
})