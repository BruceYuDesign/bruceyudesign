import { verify } from '~/verify'

export function contactVerify( data ) {
    return verify( data , [
        {
            name: 'name',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '姓名為必填！'
                }
            ]
        },
        {
            name: 'company',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '公司名稱為必填！'
                }
            ]
        },
        {
            name: 'tel',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '聯絡電話為必填！'
                },
                {
                    rule: value => value.match( /[0-9]/ ),
                    warn: '電話格式錯誤！'
                }
            ]
        },
        {
            name: 'email',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '信箱為必填！'
                },
                {
                    rule: value => value.match( /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ),
                    warn: '信箱格式錯誤！'
                }
            ]
        },
        {
            name: 'detail',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '需要服務內容為必填！'
                },
                {
                    rule: value => value.length <= 500,
                    warn: '需要服務內容已超出500字！'
                }
            ]
        }
    ])
}