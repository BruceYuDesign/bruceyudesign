import { updateData } from '~/server/db'
import { bannerIndexVerify } from '~/verify/banner'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 資料驗證
    bannerIndexVerify( data )

    // 更新排序
    await Promise.all(
        data.map( async ({ id , index }) =>
            await updateData( 'banner' , id , { index } )
        )
    )

    return 'SUCCESS'
})