import { getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    const projectTypes = await getDatas( 'projectType' , [ 'index' , 'text' ] )

    // 新增全部選項
    projectTypes.push({ id: undefined , text: '　全部　' , index: -1 })

    // 排序
    projectTypes.sort( ( a , b ) => a.index > b.index ? 1 : -1 )

    return projectTypes
})