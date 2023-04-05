import { updateData } from '~/server/db'
import { projectTypeVerify } from '~~/verify/projectType'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    // 資料驗證
    projectTypeVerify( data )

    // 更新資料
    return updateData( 'projectType' , id , {
        text: data.text
    })
})