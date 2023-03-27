import { updateData } from '~/server/db'
import { bannerIndexVerify } from '~/verify/banner'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )
    bannerIndexVerify( data )

    data.map( banner => {
        updateData( 'banner' , banner.id , {
            index: banner.index
        })
    })

    return 'SUCCESS'
})