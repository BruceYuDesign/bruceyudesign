import { v4 as uuid } from 'uuid'
import { httpStatusCodes } from '~/server/httpStatusCodes'
import firebase from 'firebase-admin'
import serviceAccount from './bruce-yu-design-firebase-adminsdk-uurgd-cfe8c62358.json'

firebase.initializeApp( {
    credential: firebase.credential.cert( serviceAccount ),
    storageBucket: 'gs://bruce-yu-design.appspot.com/'
})

const db = firebase.firestore()
const bucket = firebase.storage().bucket()

/**
 * --------------------------------------------------
 * 取得單筆資料：
 * @function
 * @param { String } collection - 集合
 * @param { String } id         - 要取得的id
 * @param { Array  } select     - 回傳的欄位
 * @returns { Object } 單筆資料
 * --------------------------------------------------
 */
export const getData = async ( collection , id , select = [] ) => {
    try {
        const snapshot = await db.collection( collection ).doc( id ).get()
        // 判斷是否有該文件
        if( !snapshot.exists ) {
            return null
        }
        const data = snapshot.data()
        // 判斷是否有篩選
        let selectedData = {}
        if( select.length > 0 ) {
            selectedData = select.reduce( ( acc , field ) => {
                if( data[ field ] ) {
                    acc[ field ] = data[ field ]
                }
                return acc
            } , {} )
        }
        else {
            selectedData = data
        }
        // 回傳
        return {
            id: snapshot.id,
            ...selectedData
        }
    }
    catch( error ) {
        throw createError( httpStatusCodes.DATABASE_ERROR )
    }
}

/**
 * --------------------------------------------------
 * 取得多筆資料：
 * @function
 * @param { String } collection - 集合
 * @param { Array  } select     - 回傳的欄位
 * @param { Object } filters    - 篩選資料
 * @returns { Array } 多筆資料
 * --------------------------------------------------
 */
export const getDatas = async ( collection , select = [] , filters = {} ) => {
    try {
        let query = db.collection( collection ).select( ...select )
        for( let [ field , { operator , value } ] of Object.entries( filters ) ) {
            query = query.where( field , operator , value )
        }
        const snapshot = await query.get()
        const datas = snapshot.docs.map( doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return datas
    }
    catch( error ) {
        throw createError( httpStatusCodes.DATABASE_ERROR )
    }
}

/**
 * --------------------------------------------------
 * 更新資料：
 * @function
 * @param { String } collection - 集合
 * @param { String } id         - 要更新的id
 * @param { Object } data       - 要更新的資料
 * --------------------------------------------------
 */
export const updateData = async ( collection , id , data ) => {
    try {
        await db.collection( collection ).doc( id ).update( data )
        return 'SUCCESS'
    }
    catch( error ) {
        throw createError( httpStatusCodes.DATABASE_ERROR )
    }
}

/**
 * --------------------------------------------------
 * 新增資料：
 * @function
 * @param { String } collection - 集合
 * @param { Object } data       - 要新增的資料
 * --------------------------------------------------
 */
export const addData = async ( collection , data ) => {
    try {
        await db.collection( collection ).add( data )
        return 'SUCCESS'
    }
    catch( error ) {
        throw createError( httpStatusCodes.DATABASE_ERROR )
    }
}

/**
 * --------------------------------------------------
 * 刪除資料：
 * @function
 * @param { String } collection - 集合
 * @param { String } id         - 要刪除的id
 * --------------------------------------------------
 */
export const deleteData = async ( collection , id ) => {
    try {
        await db.collection( collection ).doc( id ).delete()
        return 'SUCCESS'
    }
    catch( error ) {
        throw createError( httpStatusCodes.DATABASE_ERROR )
    }
}

/**
 * --------------------------------------------------
 * 資料不重複：
 * @function
 * @param { String } collection - 集合
 * @param { String } field      - 欄位
 * @param { String } value      - 值
 * @param { String } excludeId  - 排除判斷的id
 * --------------------------------------------------
 */
export const isUnique = async ( collection , field , value , excludeId ) => {
    const snapshot = await getDatas( collection , [] , {
        [ field ]: { operator: '==' , value: value }
    })
    if(
        snapshot.length > 0 &&
        snapshot[ 0 ].id !== excludeId
    ) {
        throw createError( httpStatusCodes.OVERLAPPED_DATA )
    }
}

/**
 * --------------------------------------------------
 * 查詢有無此筆資料：
 * @function
 * @param { String } collection - 集合
 * @param { String } id         - 文件id
 * --------------------------------------------------
 */
export const isExist = async ( collection , id ) => {
    const snapshot = await db.collection( collection ).doc( id ).get()
    if( !snapshot.exists ) {
        throw createError( httpStatusCodes.NOT_FOUND )
    }
}

/**
 * --------------------------------------------------
 * 清空含有特定值的欄位：
 * @function
 * @param { String } collection - 集合
 * @param { String } field      - 欄位
 * @param { String } value      - 要移除的值
 * --------------------------------------------------
 */
export const clearField = async ( collection , field , value ) => {
    const snapshot = await getDatas( collection , [] , {
        [ field ]: { operator: '==' , value: value }
    })
    snapshot.map( async doc => {
        updateData( collection , doc.id , {
            [ field ]: ''
        })
    })
}

/**
 * --------------------------------------------------
 * 移除陣列內的特定元素：
 * @function
 * @param { String } collection - 集合
 * @param { String } field      - 欄位
 * @param { String } value      - 要移除的陣列元素
 * --------------------------------------------------
 */
export const removeItem = async ( collection , field , value ) => {
    const snapshot = await getDatas( collection , [ field ] , {
        [ field ]: { operator: 'array-contains' , value: value }
    })
    snapshot.map( async doc => {
        const newField = doc[ field ].filter( item => item !== value )
        updateData( collection , doc.id , {
            [ field ]: newField
        })
    })
}

/**
 * --------------------------------------------------
 * 依特定欄位重新排序：
 * @function
 * @param { String } collection - 集合
 * @param { String } field      - 欄位
 * @param { String } excludeId  - 排除排序的id
 * --------------------------------------------------
 */
export const resetSort = async ( collection , field , excludeId ) => {
    const snapshot = await getDatas( collection , [ field ] )
    const sortData = snapshot.sort( ( a , b ) => a[ field ] > b[ field ] ? 1 : -1 )
    const filterData = sortData.filter( data => data.id !== excludeId )
    filterData.map( ( value , index ) => {
        if( value.index === index ) { return }
        updateData( collection , value.id , {
            [ field ]: index
        })
    })
}

/**
 * --------------------------------------------------
 * 上傳base64圖片：
 * @function
 * @param { String } base64Data - base64圖片
 * @param { String } filePath   - 檔案路徑
 * @returns { String } 圖片連結
 * --------------------------------------------------
 */
export const addImage = async ( base64Data , filePath ) => {
    // 是否為base64
    const matches = base64Data.match( /^data:(.+);base64,(.+)$/ )
    if( !matches ) {
        return base64Data
    }
    // 初始化
    const base64 = matches[ 2 ]
    const contentType = matches[ 1 ]
    const extension = contentType.split( '/' )[ 1 ]
    const file = bucket.file( `${ filePath }/${ uuid() }.${ extension }` )
    const buffer = Buffer.from( base64 , 'base64' )
    // 圖片格式、權限
    const stream = file.createWriteStream({
        metadata: { contentType },
        predefinedAcl: 'publicRead'
    })
    // 圖片上傳
    const { mediaLink } = await new Promise( ( resolve , reject ) => {
        stream.on( 'error' , error => {
            reject( error )
        })
        stream.on( 'finish' , async () => {
            const [ metadata ] = await file.getMetadata()
            resolve( metadata )
        })
        stream.end( buffer )
    })
    // 回傳圖片連結
    return mediaLink
}

/**
 * --------------------------------------------------
 * 合併處理新舊圖片：
 * @function
 * @param { String } fileUrl  - 檔案網址
 * @param { String } filePath - 檔案路徑
 * @returns { String } 圖片網址
 * --------------------------------------------------
 */
export const updateImage = async ( fileUrl , filePath ) => {
    const isFileExist = await imageIsExist( fileUrl )
    // Case 1: 新圖片為 Firebase Storage 中的圖片
    if( isFileExist ) {
        return fileUrl
    }
    // Case 2: 新圖片為 base64 字串
    const matches = fileUrl.match( /^data:(.+);base64,(.+)$/ )
    if( matches ) {
        return await addImage( fileUrl , filePath )
    }
    // Case 3: 新圖片不符合格式
    return ''
}

/**
 * --------------------------------------------------
 * 刪除圖片：
 * @function
 * @param { String } fileUrl - 檔案網址
 * --------------------------------------------------
 */
export const deleteImage = async ( fileUrl ) => {
    const isExist = await imageIsExist( fileUrl )
    if( !isExist ) { return }
    const matches = fileUrl.match( /\/([^/]+)\?/ )
    const filePath = matches[ 1 ].replace( '%2F' , '/' )
    const file = bucket.file( filePath )
    await file.delete()
}

/**
 * --------------------------------------------------
 * 圖片是否存在：
 * @function
 * @param { String } fileUrl - 檔案網址
 * --------------------------------------------------
 */
export const imageIsExist = async ( fileUrl ) => {
    const matches = fileUrl.match( /\/([^/]+)\?/ )
    try {
        const filePath = matches[ 1 ].replace( '%2F' , '/' )
        const file = bucket.file( filePath )
        const [ isExist ] = await file.exists()
        return isExist
    }
    catch {
        return false
    }
}