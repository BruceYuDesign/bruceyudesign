<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Update' || modalName === 'Create' "
        :can-edit-modal=" modalName === 'Create' || A_USER.put "
        @close-modal=" closeModal "
        >
        <template #head>
            {{ modalUser ? modalUser.account : '新增帳號' }}
        </template>
        <template #body>
            <AdminFormToggleButton
                label="狀態"
                true-text="啟用"
                false-text="停用"
                v-model=" user.state "
                />
            <AdminFormImage
                class="w-48 h-48 rounded-full"
                default-img="/default_user.png"
                accept-type="image/png,image/jpeg"
                :can-edit=" true "
                :can-delete=" true "
                suggestion="（建議尺寸：300 x 300）"
                :compress-quality=" 0.6 "
                :compress-mime-type=" [ 'image/jpeg' ] "
                :compress-height=" 300 "
                :compress-width=" 300 "
                v-model=" user.avatar "
                />
            <AdminFormFieldInput
                maxlength="20"
                label="帳號"
                v-model=" user.account "
                />
            <AdminFormFieldInput
                maxlength="20"
                label="名稱"
                v-model=" user.name "
                />
            <AdminFormFieldSelect
                label="權限"
                option-label="name"
                option-value="id"
                :options=" modalUserAccesses "
                v-model=" user.access "
                />
            <AdminFormFieldInput
                v-if=" modalName === 'Create' "
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
                v-if=" modalName === 'Update' && A_USER.patch "
                text="重設密碼"
                type="secondary"
                @click=" editUserPassword "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_USER.delete "
                text="刪除"
                type="danger"
                @click=" deleteUser "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_USER.put "
                text="更新"
                type="primary"
                @click=" updateUser "
                />
            <AdminFormButton
                v-if=" modalName === 'Create' && A_USER.post "
                text="建立"
                type="primary"
                @click=" addUser "
                />
        </template>
    </AdminModalBasic>
    <AdminConfirm
        ref="confirm"
        type="danger"
        font-awesome-icon="fa-solid fa-trash-can"
        message="確認要刪除嗎？"
        resolve-text="確認刪除"
        />
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const A_USER = useAuthStore().useAccess( 'user' )
</script>

<script>
    import { userVerify , userPasswordVerify } from '~/verify/user'
    const API_PATH = '/api/admin/user/'
    export default {
        props: {
            modalName:         String,
            modalUser:         Object,
            modalUserAccesses: Object,
            modalResetData:    Function
        },
        data() {
            return{
                default: {
                    state:   false,
                    account: '',
                    name:    '',
                    avatar:  '',
                    access:  ''
                },
                user: null
            }
        },
        watch: {
            modalName: {
                handler( newValue ) {
                    this.user = newValue === 'Update' ?
                        { ...this.$props.modalUser } :
                        { ...this.default }
                }
            }
        },
        methods: {
            editUserPassword() {
                this.$emit( 'update:modalName' , null )
                setTimeout( () => {
                    this.$emit( 'update:modalName' , 'Password' )
                } , 150 )
            },
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.$emit( 'update:modalUser' , null )
                this.user = null
            },
            async addUser() {
                const { data: profile  } = userVerify( this.user )
                const { data: password } = userPasswordVerify( this.user )
                await this.$fetchData( API_PATH , {
                    method: 'POST',
                    body: {
                        data: {
                            ...profile,
                            ...password
                        }
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async updateUser() {
                const { data } = userVerify( this.user )
                await this.$fetchData( API_PATH , {
                    method: 'PUT',
                    body: {
                        id: this.user.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async deleteUser() {
                try {
                    await this.$refs.confirm.showConfirm()
                    await this.$fetchData( API_PATH , {
                        method: 'DELETE',
                        body: {
                            id: this.user.id
                        }
                    })
                    this.closeModal()
                    this.$props.modalResetData()
                }
                catch {}
            }
        }
    }
</script>