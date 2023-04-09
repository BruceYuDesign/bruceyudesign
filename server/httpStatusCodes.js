export const httpStatusCodes = {
    // 成功
    OK: {
        statusCode: 200,
        statusMessage: 'Success'
    },
    // 資料錯誤
    BAD_REQUEST: {
        statusCode: 400,
        statusMessage: 'Bad request'
    },
    // 尚未登入
    UNAUTHORIZED: {
        statusCode: 401,
        statusMessage: 'Unauthorized'
    },
    // 無效Session
    INVALID_SESSION: {
        statusCode: 401,
        statusMessage: 'Invalid session'
    },
    // 無效UID
    INVALID_UID: {
        statusCode: 401,
        statusMessage: 'Invalid UID'
    },
    // Token錯誤
    TOKEN_EXPIRED: {
        statusCode: 401,
        statusMessage: 'Token expired'
    },
    // 無效帳號
    INVALID_ACCOUNT: {
        statusCode: 401,
        statusMessage: 'Invalid account'
    },
    // 密碼錯誤
    PASSWORD_ERROR: {
        statusCode: 401,
        statusMessage: 'Password error'
    },
    // 無此權限
    FORBIDDEN: {
        statusCode: 403,
        statusMessage: 'Forbidden'
    },
    // 帳號被停用
    ACCOUNT_DISABLED: {
        statusCode: 403,
        statusMessage: 'Account disabled'
    },
    // 查無資料
    NOT_FOUND: {
        statusCode: 404,
        statusMessage: 'Not found'
    },
    // 資料重複
    OVERLAPPED_DATA: {
        statusCode: 409,
        statusMessage: 'Overlapped data'
    },
    // 資料庫錯誤
    DATABASE_ERROR: {
        statusCode: 500,
        statusMessage: 'Database error'
    },
    // 伺服器錯誤
    SERVER_ERROR: {
        statusCode: 500,
        statusMessage: 'Server error'
    }
}