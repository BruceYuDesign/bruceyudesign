import { verify } from '~/verify'

export function profileVerify( data ) {
    return verify( data , [
        {
            name: 'account',
            ruleList: [
                {
                    rule: value => value.length > 0,
                    warn: '帳號為必填'
                },
                {
                    rule: value => value.length <= 20,
                    warn: '帳號請勿超過20字'
                },
                {
                    rule: value => value.match( /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/ ),
                    warn: '帳號僅能填英文、數字及符號'
                }
            ]
        },
        {
            name: 'name',
            ruleList: [
                {
                    rule: value => value.length > 0,
                    warn: '名稱為必填'
                },
                {
                    rule: value => value.length <= 20,
                    warn: '名稱請勿超過20字'
                }
            ]
        },
        {
            name: 'avatar'
        }
    ])
}

export function profilePasswordVerify( data ) {
    return verify( data , [
        {
            name: 'old',
            ruleList: [
                {
                    rule: value => value.length >= 8 && value.length <= 20,
                    warn: '密碼長度為8~20碼'
                },
                {
                    rule: value => value.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/ ),
                    warn: '密碼需有大小寫英文與數字'
                }
            ]
        },
        {
            name: 'new',
            ruleList: [
                {
                    rule: value => value !== data.old,
                    warn: '需與舊密碼不同'
                },
                {
                    rule: value => value.length >= 8 && value.length <= 20,
                    warn: '密碼長度為8~20碼'
                },
                {
                    rule: value => value.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/ ),
                    warn: '密碼需有大小寫英文與數字'
                }
            ]
        },
        {
            name: 'newConfirm',
            ruleList: [
                {
                    rule: value => value === data.new,
                    warn: '新密碼不一致'
                }
            ]
        }
    ])
}