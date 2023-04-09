import { useLoadStore } from '~/stores/isLoading'
import { usePopupStore } from '~/stores/popup'

// 錯誤處理 --------------------------------------------------
function errorHandler( error ) {
    const { statusMessage , statusCode } = error

    const errorMap = {
        'Bad request':      '資料錯誤',
        'Unauthorized':     '尚未登入',
        'Invalid session':  '無效Session',
        'Invalid UID':      '無效UID',
        'Token expired':    'Token錯誤',
        'Invalid account':  '無效帳號',
        'Password error':   '密碼錯誤',
        'Forbidden':        '無此權限，請重新登入',
        'Account disabled': '帳號被停用',
        'Not found':        '查無資料',
        'Overlapped data':  '資料重複',
        'Database error':   '資料庫錯誤',
        'Server error':     '伺服器錯誤'
    }

    const errorMessage = errorMap[ statusMessage ] || statusMessage

    if([
        'Unauthorized',
        'Invalid session',
        'Invalid UID',
        'Token expired',
        'Forbidden',
        'Account disabled',
        'Not found',
        'Database error',
        'Server error'
    ].includes( statusMessage ) ) {
        throw showError({
            statusCode,
            statusMessage: errorMessage
        })
    }
    else {
        const { setPopup } = usePopupStore()
        setPopup( errorMessage , 'danger' )
    }
}

// 成功處理 --------------------------------------------------
function successHandler(url, options) {
    const { setPopup } = usePopupStore()

    // 沒有設定 options
    if( !options ) { return }
    const { method } = options

    // 後台登入
    if( url === '/api/login/' ) {
        setPopup( '已登入' , 'success' )
        return
    }

    // 後台登出
    if( url === '/api/admin/logout/' ) {
        setPopup( '已登出' , 'primary' )
        return
    }

    // 後台操作
    if( !url.startsWith( '/api/admin/' ) ) { return }
    const methodMap = {
        POST:   '已成功新增',
        PUT:    '已成功更新',
        PATCH:  '已成功更新',
        DELETE: '已成功刪除'
    }
    const message = methodMap[ method ]
    setPopup( message , 'success' )
}

// fetch包裝 --------------------------------------------------
async function fetchData( url , options ) {
    try {
        useLoadStore().isLoading = true
        const response = await $fetch( url , options )
        successHandler( url , options )
        return response
    }
    catch( error ) {
        errorHandler( error )
        throw createError( error )
    }
    finally {
        useLoadStore().isLoading = false
    }
}

export default defineNuxtPlugin( () => {
    return {
        provide: {
            fetchData
        }
    }
})