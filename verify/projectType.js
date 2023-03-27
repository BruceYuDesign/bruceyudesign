import { verify } from '~/verify'

export function projectTypesIndexVerify( dataList = [] ) {
    let judge = true
    let verifyData = []
    // 遍歷驗證
    for( let [ index , projectType ] of dataList.entries() ) {
        const { data } = verify( projectType , [
            {
                name: 'id'
            },
            {
                name: 'index',
                ruleList: [
                    {
                        rule: value => typeof value === 'number',
                        warn: '順序僅接受數值'
                    },
                    {
                        rule: value => value === index,
                        warn: '順序有誤'
                    }
                ]
            }
        ])
        // 錯誤中斷
        if( !data ) {
            judge = false
            break
        }
        // 新增回傳資料
        verifyData.push( data )
    }
    // 回傳資料
    if( judge ) {
        return { data: verifyData }
    }
    // 回傳錯誤
    else {
        return { error: 'error' }
    }
}

export function projectTypeVerify( data ) {
    return verify( data , [
        {
            name: 'text',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '未設定類別名稱'
                }
            ]
        }
    ])
}