import { getDatas } from '~/server/db'
const PAGE_COUNT = 6

export default defineEventHandler( async event => {
    const { type , page } = getQuery( event )

    let filters = { state: { operator: '==' , value: true } }
    let pageNum = 1

    // 類別
    if( type ) {
        filters.type = { operator: 'array-contains' , value: type }
    }
    // 頁碼
    if( page ) {
        pageNum = page
    }

    let projects = await getDatas( 'project' , [ 'title' , 'subtitle' , 'imgs' ] , filters )

    const pageTotal = Math.ceil( projects.length / PAGE_COUNT )
    const pageNow   = Number( pageNum )

    projects.sort( ( a , b ) => a.date < b.date ? 1 : -1 )

    const start = PAGE_COUNT * ( pageNum - 1 )
    const end   = PAGE_COUNT * ( pageNum - 1 ) + PAGE_COUNT // pageNum - 1 會有等於 0 的情況
    projects = projects.slice( start , end )

    projects.map( data => data.imgs = data.imgs.filter( ({ page }) => page === 0 ) )
    
    return { projects , pageTotal , pageNow }
})