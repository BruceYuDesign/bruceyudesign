import { getData , deleteData , resetSort , deleteImage } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )

    // 重新排序
    await resetSort( 'banner' , 'index' , id )

    // 刪除圖片
    const { img: bannerImgSrc } = await getData( 'banner' , id , [ 'img' ] )
    await deleteImage( bannerImgSrc )

    // 刪除資料
    return deleteData( 'banner' , id )
})