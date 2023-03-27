import { getData } from '~/server/db'

export default defineEventHandler( async event => {
    // const uid = getCookie( event , 'uid' )
    const __session = JSON.parse( getCookie( event , '__session' ) )
    const uid = __session.uid
    const profile = await getData( 'user' , uid , [ 'account' , 'name' , 'avatar' , 'access' ] )
    const { access: accessId } = profile
    const {
        name:   accessName,
        desc:   accessDesc,
        access: accessData
    } = await getData( 'userAccess' , accessId , [ 'name' , 'desc' , 'access' ] )
    return {
        profile: {
            ...profile,
            accessName: accessName,
            accessDesc: accessDesc
        },
        access:  accessData
    }
})