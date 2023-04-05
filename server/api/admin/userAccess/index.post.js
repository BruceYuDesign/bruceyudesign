import { addData } from '~/server/db'
import { userAccessVerify } from '~~/verify/userAccess'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 資料驗證
    userAccessVerify( data )

    // 新增資料
    return addData( 'userAccess' , {
        name: data.name,
        desc: data.desc,
        access: {
            userAccess: {
                get:    data.access.userAccess.get,
                put:    data.access.userAccess.put,
                post:   data.access.userAccess.post,
                delete: data.access.userAccess.delete
            },
            user: {
                get:    data.access.user.get,
                patch:  data.access.user.patch,
                put:    data.access.user.put,
                post:   data.access.user.post,
                delete: data.access.user.delete
            },
            bannerOption: {
                put: data.access.bannerOption.put
            },
            banner: {
                get:    data.access.banner.get,
                patch:  data.access.banner.patch,
                put:    data.access.banner.put,
                post:   data.access.banner.post,
                delete: data.access.banner.delete
            },
            projectType: {
                get:    data.access.projectType.get,
                patch:  data.access.projectType.patch,
                put:    data.access.projectType.put,
                post:   data.access.projectType.post,
                delete: data.access.projectType.delete
            },
            project: {
                get:    data.access.project.get,
                put:    data.access.project.put,
                post:   data.access.project.post,
                delete: data.access.project.delete
            }
        }
    })
})