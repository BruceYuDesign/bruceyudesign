import { getDatas , addData } from '~/server/db'
import { projectTypeVerify } from '~~/verify/projectType'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 資料驗證
    projectTypeVerify( data )

    // 取的新的排序
    const { length: projectTypeIndex } = await getDatas( 'projectType' )

    // 新增資料
    return addData( 'projectType' , {
        text:  data.text,
        index: projectTypeIndex
    })
})