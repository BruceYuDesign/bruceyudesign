import { verify } from '~/verify'

export function bannerOptionVerify( data ) {
    return verify( data , [
        {
            name: 'timing',
            ruleList: [
                {
                    rule: value => typeof value === 'number',
                    warn: '切換秒數僅接受數字'
                },
                {
                    rule: value => value >= 1 && value <= 20,
                    warn: '切換秒數須介於1~20秒'
                }
            ]
        }
    ])
}