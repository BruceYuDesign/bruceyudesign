import { updateData } from '~/server/db'
import { projectTypesIndexVerify } from '~~/verify/projectType'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 資料驗證
    projectTypesIndexVerify( data )

    // 更新排序
    await Promise.all(
        data.map( async ({ id , index }) =>
            await updateData( 'projectType' , id , { index } )
        )
    )

    return 'SUCCESS'
})