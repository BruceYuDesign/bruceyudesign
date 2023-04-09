export function verify( data , form = [] ) {
    let isValid = true
    let errorText

    // 遍歷欄位
    for( let { name , ruleList = [] } of form ) {
        // 錯誤中斷
        if( !isValid ) {
            break
        }
        // 遍歷規則
        for( let { rule , warn } of ruleList ) {
            // 不符規則
            if( !rule( data[ name ] ) ) {
                isValid = false
                errorText = warn
                break
            }
        }
    }

    // 驗證正確
    if( isValid ) {
        const returnData = form.reduce( ( result , { name } ) => {
            result[ name ] = data[ name ]
            return result
        } , {} )
        return { data: returnData }
    }

    // 驗證錯誤
    if( process.client ) {
        throw createError({
            statusCode: 400,
            statusMessage: errorText
        })
    }
    else {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad request'
        })
    }
}