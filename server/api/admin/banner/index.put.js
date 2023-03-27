import { updateData } from '~/server/db'
import { bannerVerify } from '~/verify/banner'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )
    bannerVerify( data )
    return updateData( 'banner' , id , {
        tool: data.tool,
        use:  data.use,
        img:  data.img,
        gradient: {
            start: data.gradient.start,
            end:   data.gradient.end
        }
    })
})