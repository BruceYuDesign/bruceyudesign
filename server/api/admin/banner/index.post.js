import { getDatas , addData , addImage } from '~/server/db'
import { bannerVerify } from '~/verify/banner'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 資料驗證
    bannerVerify( data )

    // 取得新排序
    const { length: bannerIndex } = await getDatas( 'banner' )

    // 新增圖片
    const bannerImgSrc = await addImage( data.img , 'banner' )

    // 新增資料
    return addData( 'banner' , {
        tool:  data.tool,
        use:   data.use,
        img:   bannerImgSrc,
        index: bannerIndex,
        gradient: {
            start: data.gradient.start,
            end:   data.gradient.end
        }
    })
})