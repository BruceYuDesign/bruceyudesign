import { isExist , addData , addImage } from '~/server/db'
import { projectVerify } from '~/verify/project'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )

    // 資料驗證
    projectVerify( data )

    // 權限是否存在
    for( let type of data.type ) {
        await isExist( 'projectType' , type )
    }

    // 新增圖片
    for( let img of data.imgs ) {
        let projectImgSrc = await addImage( img.src , 'project' )
        img.src = projectImgSrc
    }

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