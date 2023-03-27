<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Password' "
        @close-modal=" closeModal "
        >
        <template #head>
            修改密碼
        </template>
        <template #body>
            <AdminFormFieldInput
                label="舊密碼"
                type="password"
                maxlength="20"
                v-model=" password.old "
                />
            <AdminFormFieldInput
                label="新密碼"
                type="password"
                maxlength="20"
                v-model=" password.new "
                />
            <AdminFormFieldInput
                label="確認新密碼"
                type="password"
                maxlength="20"
                v-model=" password.newConfirm "
                />
        </template>
        <template #foot>
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "
                />
            <AdminFormButton
                text="儲存"
                type="primary"
                @click=" savePassword "
                />
        </template>
    </AdminModalBasic>
</template>

<script>
    import { profilePasswordVerify } from '~/verify/profile'
    const API_PATH = '/api/admin/profile/'
    export default {
        props: {
            modalName: String
        },
        data() {
            return{
                password: {
                    old:        '',
                    new:        '',
                    newConfirm: ''
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.password = {
                    old:        '',
                    new:        '',
                    newConfirm: ''
                }
            },
            async savePassword() {
                const { data } = profilePasswordVerify( this.password )
                await this.$fetchData( API_PATH , {
                    method: 'PATCH',
                    body: {
                        data: data
                    }
                })
                this.closeModal()
            }
        }
    }
</script>