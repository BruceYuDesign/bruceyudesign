<template>
    <div class="flex flex-row gap-4">
        <AdminFormButton
            v-if=" A_PROJECT_TYPE.post "
            text="新增專案類別"
            type="primary"
            @click=" modalCreateProjectType "
            />
    </div>
    <AdminTableDraggable
        :headers=" table.headers "
        v-model=" data.projectTypes "
        item-key="index"
        :can-drag=" A_PROJECT_TYPE.patch "
        @click-row=" modalUpdateProjectType "
        :save-items=" saveProjectTypeIndex "
        >
        <template #item-index="{ index }">
            {{ index + 1 }}
        </template>
    </AdminTableDraggable>
    <AdminModalProjectTypeEdit
        v-model:modal-name=" modal.name "
        v-model:modal-project-type=" modal.projectType "
        v-bind:modal-reset-data=" getProjectTypes "
        />
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    useAuthStore().canAccessPage( 'projectType' )
    const A_PROJECT_TYPE = useAuthStore().useAccess( 'projectType' )
</script>

<script>
    import { projectTypesIndexVerify } from '~~/verify/projectType'
    const API_PATH = '/api/admin/projectType/'
    export default {
        data() {
            return{
                data: {
                    projectTypes: []
                },
                modal: {
                    name:         null,
                    projectType: null
                },
                table: {
                    headers: [
                        {
                            text: '順序',
                            value: 'index'
                        },
                        {
                            text: '類別',
                            value: 'text'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.getProjectTypes()
        },
        methods: {
            async getProjectTypes() {
                const projectType = await this.$fetchData( API_PATH )
                projectType.sort( ( a , b ) => a.index > b.index ? 1 : -1 )
                this.data.projectTypes = projectType
            },
            modalCreateProjectType() {
                this.modal = {
                    name: 'Create',
                    projectType: null
                }
            },
            modalUpdateProjectType( data ) {
                this.modal = {
                    name: 'Update',
                    projectType: data
                }
            },
            async saveProjectTypeIndex() {
                const { data } = projectTypesIndexVerify( this.data.projectTypes )
                await this.$fetchData( API_PATH , {
                    method: 'PATCH',
                    body: {
                        data: data
                    }
                })
                this.getProjectTypes()
            }
        }
    }
</script>