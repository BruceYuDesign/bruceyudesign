import { getData , deleteData , deleteImage } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )

    // 刪除圖片
    const { imgs } = await getData( 'project' , id , [ 'imgs' ] )
    await Promise.all(
        imgs.map( async ({ src }) => 
            await deleteImage( src , 'project' )
        )
    )

    // 刪除資料
    return deleteData( 'project' , id )
})