import { getData , updateData , deleteImage , updateImage } from '~/server/db'
import { bannerVerify } from '~/verify/banner'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    // 資料驗證
    bannerVerify( data )

    // 刪除舊圖片
    const { img: bannerImgSrc } = await getData( 'banner' , id , [ 'img' ] )
    if( data.img !== bannerImgSrc ) {
        await deleteImage( bannerImgSrc )
    }

    // 更新圖片
    const newBannerImgSrc = await updateImage( data.img , 'banner' )

    // 更新資料
    return updateData( 'banner' , id , {
        tool: data.tool,
        use:  data.use,
        img:  newBannerImgSrc,
        gradient: {
            start: data.gradient.start,
            end:   data.gradient.end
        }
    })
})