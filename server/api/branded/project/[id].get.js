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
        // 更多文章，排除自身
        const projects = response[ 2 ].filter( data => data.id !== id )

        // 未有該project
        if( !project ) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found'
            })
        }

        // 該project未上架
        if( !project.state ) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Forbidden'
            })
        }

        // project.type的id轉為文字
        project.type = project.type.map( typeId => {
            const type = projectType.find( ({ id }) => id === typeId )
            return type ? type.text : typeId
        })

        // 排序projects
        projects.sort( ( a , b ) => a.date < b.date ? 1 : -1 )
        // 前五筆
        projects.splice( 5 )
        // 只取得第一張封面
        projects.forEach( data => data.imgs = data.imgs.filter( ({ page }) => page === 0 ) )

        return {
            project: project,
            projects: projects
        }
    }) 
})