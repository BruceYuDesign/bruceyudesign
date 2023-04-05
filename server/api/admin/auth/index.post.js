import { getData } from '~/server/db'

export default defineEventHandler( async event => {
    const __session = JSON.parse( getCookie( event , '__session' ) )
    const uid = __session.uid

    // 取得用戶資料
    const profile = await getData( 'user' , uid , [ 'account' , 'name' , 'avatar' , 'access' ] )

    // 取得權限資料
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