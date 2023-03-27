<template>
    <AdminInfo>
        <template #body-row>
            <AdminFormImage
                class="w-60 h-60 rounded-full"
                default-img="/default_user.png"
                accept-type="image/png,image/jpeg"
                :can-edit=" mode === 'Edit' "
                :can-delete=" true "
                suggestion="（建議尺寸：300 x 300）"
                :compress-quality=" 0.6 "
                :compress-mime-type=" [ 'image/jpeg' ] "
                :compress-height=" 300 "
                :compress-width=" 300 "
                v-model=" data.user.avatar "
                />
            <div class="w-full flex flex-col gap-4">
                <AdminFormFieldInput
                    label="帳號"
                    maxlength="20"
                    :disabled=" mode !== 'Edit' "
                    v-model=" data.user.account "
                    />
                <AdminFormFieldInput
                    label="名稱"
                    maxlength="20"
                    :disabled=" mode !== 'Edit' "
                    v-model=" data.user.name "
                    />
                <hr class="my-2"/>
                <AdminNotification
                    :text="`「${ data.user.accessName }」權限：\n${ data.user.accessDesc }`"
                    />
            </div>
        </template>
        <template #foot>
            <AdminFormButton
                text="修改密碼"
                type="secondary"
                v-show=" mode === 'Preview' "
                @click=" modalEditPassword "
                />
            <AdminFormButton
                text="修改資料"
                type="secondary"
                v-show=" mode === 'Preview' "
                @click=" editProfile "
                />
            <AdminFormButton
                text="登出"
                type="danger"
                v-show=" mode === 'Preview' "
                @click=" modalAskLogout "
                />
            <AdminFormButton
                text="取消"
                type="secondary"
                v-show=" mode === 'Edit' "
                @click=" cancelProfile "
                />
            <AdminFormButton
                text="儲存"
                type="primary"
                v-show=" mode === 'Edit' "
                @click=" saveProfile "
                />
        </template>
    </AdminInfo>
    <AdminModalProfilePassword
        v-model:modal-name=" modal.name "
        />
    <AdminModalProfileLogout
        v-model:modal-name=" modal.name "
        />
</template>

<script>
    import { useAuthStore } from '~/stores/auth'
    import { profileVerify } from '~/verify/profile'
    const API_PATH = '/api/admin/profile/'
    export default {
        data() {
            return{
                data: {
                    user: _clone( useAuthStore().auth.profile )
                },
                memory: {
                    user: _clone( useAuthStore().auth.profile )
                },
                mode: 'Preview',
                modal: {
                    name: null
                }
            }
        },
        methods: {
            modalEditPassword() {
                this.modal.name = 'Password'
            },
            modalAskLogout() {
                this.modal.name = 'Logout'
            },
            editProfile() {
                this.mode = 'Edit'
            },
            cancelProfile() {
                this.mode = 'Preview'
                this.data.user = _clone( this.memory.user )
            },
            async saveProfile() {
                const { data } = profileVerify( this.data.user )
                await this.$fetchData( API_PATH , {
                    method: 'PUT',
                    body: {
                        data: data
                    }
                })
                useAuthStore().auth.profile = _clone( this.data.user )
                this.memory.user = _clone( this.data.user )
                this.mode = 'Preview'
            }
        }
    }
</script>