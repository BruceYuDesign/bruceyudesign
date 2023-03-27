import { verify } from '~/verify'

export function bannerIndexVerify( dataList = [] ) {
    let judge = true
    let verifyData = []
    // 遍歷驗證
    for( let [ index , banner ] of dataList.entries() ) {
        const { data } = verify( banner , [
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

export function bannerVerify( data ) {
    return verify( data , [
        {
            name: 'tool',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '未設定使用工具'
                }
            ]
        },
        {
            name: 'use',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '未設定用途'
                }
            ]
        },
        {
            name: 'img',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '未設定圖片'
                }
            ]
        },
        {
            name: 'gradient',
            ruleList: [
                {
                    rule: value => {
                        let regex = /^#([0-9a-fA-F]{6})$/
                        return (
                            value.start.match( regex ) &&
                            value.end  .match( regex )
                        )
                    },
                    warn: '顏色格式僅接受7碼hex字串，如：#ffffff'
                }
            ]
        }
    ])
}