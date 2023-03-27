<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Update' || modalName === 'Create' "
        :can-edit-modal=" modalName === 'Create' || A_USER_ACCESS.put "
        @close-modal=" closeModal "
        >
        <template #head>
            {{ modalUserAccess ? modalUserAccess.name : '新增帳號' }}
        </template>
        <template #body>
            <AdminFormFieldInput
                maxlength="20"
                label="權限名稱"
                v-model=" userAccess.name "
                />
            <AdminFormFieldTextarea
                maxlength="250"
                rows="5"
                label="權限說明"
                v-model=" userAccess.desc "
                />
            <hr/>
            <span>帳號權限管理</span>
            <div class="checkbox-list">
                <AdminFormCheckbox
                    label="查詢"
                    v-model=" userAccess.access.userAccess.get "
                    />
                <AdminFormCheckbox
                    label="修改"
                    v-model=" userAccess.access.userAccess.put "
                    />
                <AdminFormCheckbox
                    label="新增"
                    v-model=" userAccess.access.userAccess.post "
                    />
                <AdminFormCheckbox
                    label="刪除"
                    v-model=" userAccess.access.userAccess.delete "
                    />
            </div>
            <hr/>
            <span>帳號管理</span>
            <div class="checkbox-list">
                <AdminFormCheckbox
                    label="查詢"
                    v-model=" userAccess.access.user.get "
                    />
                <AdminFormCheckbox
                    label="重設密碼"
                    v-model=" userAccess.access.user.patch "
                    />
                <AdminFormCheckbox
                    label="修改"
                    v-model=" userAccess.access.user.put "
                    />
                <AdminFormCheckbox
                    label="新增"
                    v-model=" userAccess.access.user.post "
                    />
                <AdminFormCheckbox
                    label="刪除"
                    v-model=" userAccess.access.user.delete "
                    />
            </div>
            <hr/>
            <span>廣告播放設定</span>
            <div class="checkbox-list">
                <AdminFormCheckbox
                    label="修改"
                    v-model=" userAccess.access.bannerOption.put "
                    />
            </div>
            <hr/>
            <span>廣告管理</span>
            <div class="checkbox-list">
                <AdminFormCheckbox
                    label="查詢"
                    v-model=" userAccess.access.banner.get "
                    />
                <AdminFormCheckbox
                    label="調整順序"
                    v-model=" userAccess.access.banner.patch "
                    />
                <AdminFormCheckbox
                    label="修改"
                    v-model=" userAccess.access.banner.put "
                    />
                <AdminFormCheckbox
                    label="新增"
                    v-model=" userAccess.access.banner.post "
                    />
                <AdminFormCheckbox
                    label="刪除"
                    v-model=" userAccess.access.banner.delete "
                    />
            </div>
            <hr/>
            <span>專案類別設定</span>
            <div class="checkbox-list">
                <AdminFormCheckbox
                    label="查詢"
                    v-model=" userAccess.access.projectType.get "
                    />
                <AdminFormCheckbox
                    label="調整順序"
                    v-model=" userAccess.access.projectType.patch "
                    />
                <AdminFormCheckbox
                    label="修改"
                    v-model=" userAccess.access.projectType.put "
                    />
                <AdminFormCheckbox
                    label="新增"
                    v-model=" userAccess.access.projectType.post "
                    />
                <AdminFormCheckbox
                    label="刪除"
                    v-model=" userAccess.access.projectType.delete "
                    />
            </div>
            <hr/>
            <span>專案管理</span>
            <div class="checkbox-list">
                <AdminFormCheckbox
                    label="查詢"
                    v-model=" userAccess.access.project.get "
                    />
                <AdminFormCheckbox
                    label="修改"
                    v-model=" userAccess.access.project.put "
                    />
                <AdminFormCheckbox
                    label="新增"
                    v-model=" userAccess.access.project.post "
                    />
                <AdminFormCheckbox
                    label="刪除"
                    v-model=" userAccess.access.project.delete "
                    />
            </div>
        </template>
        <template #foot>
            <AdminNotification
                v-if=" modalName === 'Update' && A_USER_ACCESS.delete "
                type="warning"
                text="刪除權限後，有該權限的帳戶會無法使用"
                />
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_USER_ACCESS.delete "
                text="刪除"
                type="danger"
                @click=" deleteUserAccess "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_USER_ACCESS.put "
                text="更新"
                type="primary"
                @click=" updateUserAccess "
                />
            <AdminFormButton
                v-if=" modalName === 'Create' && A_USER_ACCESS.post "
                text="建立"
                type="primary"
                @click=" addUserAccess "
                />
        </template>
    </AdminModalBasic>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const A_USER_ACCESS = useAuthStore().useAccess( 'userAccess' )
</script>

<script>
    import { userAccessVerify } from '~~/verify/userAccess'
    const API_PATH = '/api/admin/userAccess/'
    export default {
        props: {
            modalName:       String,
            modalUserAccess: Object,
            modalResetData:  Function
        },
        data() {
            return{
                default: {
                    name: '',
                    desc: '',
                    access: {
                        userAccess: {
                            get:    false,
                            put:    false,
                            post:   false,
                            delete: false
                        },
                        user: {
                            get:    false,
                            patch:  false,
                            put:    false,
                            post:   false,
                            delete: false
                        },
                        bannerOption: {
                            put: false
                        },
                        banner: {
                            get:    false,
                            patch:  false,
                            put:    false,
                            post:   false,
                            delete: false
                        },
                        projectType: {
                            get:    false,
                            patch:  false,
                            put:    false,
                            post:   false,
                            delete: false
                        },
                        project: {
                            get:    false,
                            put:    false,
                            post:   false,
                            delete: false
                        }
                    }
                },
                userAccess: null
            }
        },
        watch: {
            modalName: function() {
                if( this.$props.modalName === 'Create' ) {
                    this.userAccess = _cloneDeep( this.default )
                }
                else if( this.$props.modalName === 'Update' ) {
                    this.userAccess = _cloneDeep( this.$props.modalUserAccess )
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.$emit( 'update:modalUserAccess' , null )
                this.userAccess = null
            },
            async addUserAccess() {
                const { data } = userAccessVerify( this.userAccess )
                await this.$fetchData( API_PATH , {
                    method: 'POST',
                    body: {
                        id: this.userAccess.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async updateUserAccess() {
                const { data } = userAccessVerify( this.userAccess )
                await this.$fetchData( API_PATH , {
                    method: 'PUT',
                    body: {
                        id: this.userAccess.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async deleteUserAccess() {
                await this.$fetchData( API_PATH , {
                    method: 'DELETE',
                    body: {
                        id: this.userAccess.id
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            }
        }
    }
</script>

<style scoped>
    .checkbox-list {
        @apply flex flex-row flex-wrap gap-4 -mt-2
    }
</style>