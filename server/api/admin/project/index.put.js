import { getData , isExist , updateData , updateImage , deleteImage } from '~/server/db'
import { projectVerify } from '~/verify/project'

export default defineEventHandler( async event => {
    const { id , data } = await readBody( event )

    // 資料驗證
    projectVerify( data )

    // 權限是否存在
    for( let type of data.type ) {
        await isExist( 'projectType' , type )
    }

    // 刪除已棄用圖片
    const { imgs: oldProjectImgs } = await getData( 'project' , id , [ 'imgs' ] )
    await Promise.all(
        oldProjectImgs.map( async ({ src: oldImgSrc }) => {
            const imageIsExist = data.imgs.some( ({ src: newImgSrc }) => oldImgSrc === newImgSrc )
            imageIsExist || await deleteImage( oldImgSrc )
        })
    )

    // 更新圖片
    await Promise.all(
        data.imgs.map( async ( element , index ) => {
            const imgSrc = await updateImage( data.imgs[ index ].src , 'project' )
            data.imgs[ index ].src = imgSrc
        })
    )

    // 更新資料
    return updateData( 'project' , id , {
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