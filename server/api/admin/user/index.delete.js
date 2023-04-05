import { deleteData } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )

    // 刪除資料
    return deleteData( 'user' , id )
})