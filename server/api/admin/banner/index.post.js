import { getDatas , addData } from '~/server/db'
import { bannerVerify } from '~/verify/banner'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )
    bannerVerify( data )
    const { length: bannerIndex } = await getDatas( 'banner' )
    return addData( 'banner' , {
        tool:  data.tool,
        use:   data.use,
        img:   data.img,
        index: bannerIndex,
        gradient: {
            start: data.gradient.start,
            end:   data.gradient.end
        }
    })
})