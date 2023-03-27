import { verify } from '~/verify'

const isBoolean = ( access ) => {
    return typeof access === 'boolean'
}

export function userAccessVerify( data ) {
    return verify( data , [
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
                },
            ]
        },
        {
            name: 'desc',
            ruleList: [
                {
                    rule: value => value.length <= 250,
                    warn: '權限說明請勿超過250字'
                }
            ]
        },
        {
            name: 'access',
            ruleList: [
                {
                    rule: access => {
                        return (
                            isBoolean( access.userAccess.get     ) &&
                            isBoolean( access.userAccess.put     ) &&
                            isBoolean( access.userAccess.post    ) &&
                            isBoolean( access.userAccess.delete  ) &&
                            isBoolean( access.user.get           ) &&
                            isBoolean( access.user.patch         ) &&
                            isBoolean( access.user.put           ) &&
                            isBoolean( access.user.post          ) &&
                            isBoolean( access.user.delete        ) &&
                            isBoolean( access.bannerOption.put   ) &&
                            isBoolean( access.banner.get         ) &&
                            isBoolean( access.banner.patch       ) &&
                            isBoolean( access.banner.put         ) &&
                            isBoolean( access.banner.post        ) &&
                            isBoolean( access.banner.delete      ) &&
                            isBoolean( access.projectType.get    ) &&
                            isBoolean( access.projectType.patch  ) &&
                            isBoolean( access.projectType.put    ) &&
                            isBoolean( access.projectType.post   ) &&
                            isBoolean( access.projectType.delete ) &&
                            isBoolean( access.project.get        ) &&
                            isBoolean( access.project.put        ) &&
                            isBoolean( access.project.post       ) &&
                            isBoolean( access.project.delete     )
                        )
                    },
                    warn: '權限設定僅接受布林值'
                }
            ]
        }
    ])
}