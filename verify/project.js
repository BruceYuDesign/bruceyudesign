import { verify } from '~/verify'

export function projectVerify( data ) {
    return verify( data , [
        {
            name: 'state',
            ruleList: [
                {
                    rule: value => typeof value === 'boolean',
                    warn: '狀態僅接受布林值'
                }
            ]
        },
        {
            name: 'imgs',
            ruleList: [
                {
                    rule: value => value.length > 0,
                    warn: '至少上傳一張圖片'
                },
                {
                    rule: value => value.length <= 10,
                    warn: '請勿超過十張圖片'
                }
            ]
        },
        {
            name: 'type',
            ruleList: [
                {
                    rule: value => value.length > 0,
                    warn: '未設定專案類別'
                }
            ]
        },
        {
            name: 'title',
            ruleList: [
                {
                    rule: value => value.length > 0,
                    warn: '標題為必填'
                },
                {
                    rule: value => value.length <= 20,
                    warn: '標題請勿超過20字'
                }
            ]
        },
        {
            name: 'subtitle',
            ruleList: [
                {
                    rule: value => value.length > 0,
                    warn: '標題為必填'
                },
                {
                    rule: value => value.length <= 20,
                    warn: '標題請勿超過20字'
                }
            ]
        },
        {
            name: 'date',
            ruleList: [
                {
                    rule: value => value !== '',
                    warn: '未設定專案日期'
                }
            ]
        },
        {
            name: 'linkName',
            ruleList: [
                {
                    rule: () => 
                        ( data.linkName !== '' && data.linkHref !== '' ) ||
                        ( data.linkName === '' && data.linkHref === '' ),
                    warn: '連結未設定完整'
                }
            ]
        },
        {
            name: 'linkHref',
            ruleList: [
                {
                    rule: () =>
                        ( data.linkName !== '' && data.linkHref !== '' ) ||
                        ( data.linkName === '' && data.linkHref === '' ),
                    warn: '連結未設定完整'
                }
            ]
        },
        {
            name: 'desc',
            ruleList: [
                {
                    rule: value => value.length > 0,
                    warn: '未設定內文'
                },
                {
                    rule: value => value.length <= 500,
                    warn: '內文請勿超過500字'
                }
            ]
        }
    ])
}