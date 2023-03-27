import { getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    const projectTypes = await getDatas( 'projectType' , [ 'index' , 'text' ] )
    projectTypes.push({ id: undefined , text: '　全部　' , index: -1 })
    projectTypes.sort( ( a , b ) => a.index > b.index ? 1 : -1 )
    return projectTypes
})