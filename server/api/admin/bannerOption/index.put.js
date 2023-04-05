import { updateData } from '~/server/db'
import { bannerOptionVerify } from '~~/verify/bannerOption'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    // 資料驗證
    bannerOptionVerify( data )

    // 更新資料
    return updateData( 'bannerOption' , id , {
        timing: data.timing
    })
})