import { getData , getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    return Promise.all([
        getData( 'bannerOption' , 'bannerOption' , [ 'timing' ] ),
        getDatas( 'banner' , [ 'use' , 'tool' , 'img' , 'gradient' , 'index' ] ),
        getDatas( 'project' , [ 'title' , 'subtitle' , 'imgs' , 'date' ] , {
            state: { operator: '==' , value: true }
        })
    ])
    .then( response => {
        const bannerOption = response[ 0 ]
        const banners  = response[ 1 ]
        const projects = response[ 2 ]

        banners.sort( ( a , b ) => a.index > b.index ? 1 : -1 )

        projects.sort( ( a , b ) => a.date < b.date ? 1 : -1 )
        projects.splice( 5 )
        projects.forEach( data => data.imgs = data.imgs.filter( ({ page }) => page === 0 ) )

        return {
            bannerOption,
            banners,
            projects
        }
    })
})