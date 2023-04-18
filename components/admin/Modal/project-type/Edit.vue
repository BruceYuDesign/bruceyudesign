<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Update' || modalName === 'Create' "
        :can-edit-modal=" modalName === 'Create' || A_PROJECT_TYPE.put "
        @close-modal=" closeModal "
        >
        <template #head>
            {{ modalProjectType ? modalProjectType.text : '新增類別' }}
        </template>
        <template #body>
            <AdminFormFieldInput
                label="類別名稱"
                v-model=" projectType.text "
                />
        </template>
        <template #foot>
            <AdminNotification
                v-if=" modalName === 'Update' && A_PROJECT_TYPE.delete "
                type="warning"
                text="刪除類別後，該類別的專案會無法顯示"
                />
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_PROJECT_TYPE.delete "
                text="刪除"
                type="danger"
                @click=" deleteProjectType "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_PROJECT_TYPE.put "
                text="更新"
                type="primary"
                @click=" updateProjectType "
                />
            <AdminFormButton
                v-if=" modalName === 'Create' && A_PROJECT_TYPE.post "
                text="建立"
                type="primary"
                @click=" addProjectType "
                />
        </template>
    </AdminModalBasic>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const A_PROJECT_TYPE = useAuthStore().useAccess( 'projectType' )
</script>

<script>
    import { projectTypeVerify } from '~/verify/projectType'
    const API_PATH = '/api/admin/projectType/'
    export default {
        props: {
            modalName:       String,
            modalProjectType: Object,
            modalResetData:  Function
        },
        data() {
            return{
                default: {
                    text: ''
                },
                projectType: null
            }
        },
        watch: {
            modalName: {
                handler( newValue ) {
                    this.projectType = newValue === 'Update' ?
                        { ...this.$props.modalProjectType } :
                        { ...this.default }
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.$emit( 'update:modalProjectType' , null )
                this.projectType = null
            },
            async addProjectType() {
                const { data } = projectTypeVerify( this.projectType )
                await this.$fetchData( API_PATH , {
                    method: 'POST',
                    body: {
                        id: this.projectType.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async updateProjectType() {
                const { data } = projectTypeVerify( this.projectType )
                await this.$fetchData( API_PATH , {
                    method: 'PUT',
                    body: {
                        id: this.projectType.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async deleteProjectType() {
                await this.$fetchData( API_PATH , {
                    method: 'DELETE',
                    body: {
                        id: this.projectType.id
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            }
        }
    }
</script>