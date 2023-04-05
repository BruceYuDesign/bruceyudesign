import { resetSort , removeItem , deleteData } from '~/server/db'

export default defineEventHandler( async event => {
    const { id } = await readBody( event )

    // 重新排序
    await resetSort( 'projectType' , 'index' , id )

    // 移除有該類別的project.type
    await removeItem( 'project' , 'type' , id )

    // 刪除資料
    return deleteData( 'projectType' , id )
})