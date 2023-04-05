import { clearField , deleteData } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )

    // 清空有該權限的user.access
    await clearField( 'user' , 'access' , id )

    // 刪除資料
    return deleteData( 'userAccess' , id )
})