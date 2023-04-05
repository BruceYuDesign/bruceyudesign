import { isExist , addData , addImage } from '~/server/db'
import { projectVerify } from '~/verify/project'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 資料驗證
    projectVerify( data )

    // 權限是否存在
    await Promise.all(
        data.type.map( async type =>
            await isExist( 'projectType' , type )
        )
    )

    // 新增圖片
    await Promise.all(
        data.imgs.map( async img => {
            const projectImgSrc = await addImage( img.src , 'project' )
            img.src = projectImgSrc
        })
    )

    // 新增資料
    return addData( 'project' , {
        state:    data.state,
        imgs:     data.imgs,
        type:     data.type,
        title:    data.title,
        subtitle: data.subtitle,
        date:     data.date,
        linkName: data.linkName,
        linkHref: data.linkHref,
        desc:     data.desc
    })
})