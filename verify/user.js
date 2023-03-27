import { verify } from '~/verify'

export function userVerify( data ) {
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
            name: 'account',
            ruleList: [
                {
                    rule: value => value.match( /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/ ),
                    warn: '帳號僅能填英文、數字及符號'
                },
                {
                    rule: value => value.length > 0,
                    warn: '帳號為必填'
                },
                {
                    rule: value => value.length <= 20,
                    warn: '帳號請勿超過20字'
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
        },
        {
            name: 'access',
            ruleList: [
                {
                    rule: value => value,
                    warn: '需設定帳號權限'
                }
            ]
        }
    ])
}

export function userPasswordVerify( data ) {
    return verify( data , [
        {
            name: 'password',
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
        }
    ])
}