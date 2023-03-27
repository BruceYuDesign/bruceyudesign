import { updateData } from '~/server/db'
import { bannerOptionVerify } from '~~/verify/bannerOption'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )
    bannerOptionVerify( data )
    return updateData( 'bannerOption' , id , {
        timing: data.timing
    })
})