import { getDatas } from '~/server/db'
const PAGE_COUNT = 6

export default defineEventHandler( async event => {
    const { type , page } = getQuery( event )

    // 篩選
    const filters = {
        state: { operator: '==', value: true },
        ...( type && { type: { operator: 'array-contains', value: type } } )
    }

    const projects = await getDatas( 'project' , [ 'title' , 'subtitle' , 'imgs' ] , filters )

    // 頁碼
    const pageNow   = Number( page || 1 )
    const pageTotal = Math.ceil( projects.length / PAGE_COUNT )

    projects.sort( ( a , b ) => a.date < b.date ? 1 : -1 )
    projects.splice( 0 , PAGE_COUNT * ( pageNow - 1 ) )
    projects.splice( PAGE_COUNT )
    projects.forEach( data => data.imgs = data.imgs.filter( ({ page }) => page === 0 ) )
    
    return { projects , pageTotal , pageNow }
})