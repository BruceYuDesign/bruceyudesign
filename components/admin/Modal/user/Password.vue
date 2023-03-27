<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Password' "
        @close-modal=" closeModal "
        >
        <template #head>
            重設密碼
        </template>
        <template #body>
            <AdminFormFieldInput
                type="password"
                label="密碼"
                v-model=" user.password "
                />
        </template>
        <template #foot>
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "
                />
            <AdminFormButton
                text="更新"
                type="primary"
                @click=" updateUserPassword "
                />
        </template>
    </AdminModalBasic>
</template>

<script>
    import { userPasswordVerify } from '~/verify/user'
    const API_PATH = '/api/admin/user/'
    export default {
        props: {
            modalName: String,
            modalUser: Object
        },
        data() {
            return{
                user: {
                    password: ''
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.user.password = ''
                setTimeout( () => {
                    this.$emit( 'update:modalName' , 'Update' )
                } , 150 )
            },
            async updateUserPassword() {
                const { data } = userPasswordVerify( this.user )
                await this.$fetchData( API_PATH , {
                    method: 'PATCH',
                    body: {
                        id: this.$props.modalUser.id,
                        data: data
                    }
                })
                this.closeModal()
            }
        }
    }
</script>