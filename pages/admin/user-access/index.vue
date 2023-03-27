<template>
    <AdminInfo>
        <template #head>
            <AdminFormButton
                v-if=" A_USER_ACCESS.post "
                text="新增權限"
                type="primary"
                @click=" modalCreateUserAccess( data ) "
                />
        </template>
        <template #body>
            <AdminFormFieldInput
                label="文字搜尋"
                v-model=" search.text "
                />
        </template>
        <template #foot>
            <AdminFormButton
                text="重設"
                type="secondary"
                @click=" resetSearch "
                />
            <AdminFormButton
                text="搜尋"
                type="primary"
                @click=" searchData "
                />
        </template>
    </AdminInfo>
    <AdminTableBasic
        :headers=" table.headers "
        :items=" table.items "
        @click-row=" data => modalUpdateUserAccess( data ) "
        >
    </AdminTableBasic>
    <AdminModalUserAccessEdit
        v-model:modal-name=" modal.name "
        v-model:modal-user-access=" modal.userAccess "
        v-bind:modal-reset-data=" getUserAcceess "
        />
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    useAuthStore().canAccessPage( 'userAccess' )
    const A_USER_ACCESS = useAuthStore().useAccess( 'userAccess' )
</script>

<script>
    const API_PATH = '/api/admin/userAccess/'
    export default {
        data() {
            return {
                data: {
                    userAccesses: []
                },
                modal: {
                    name:       null,
                    userAccess: null
                },
                search: {
                    text: ''
                },
                table: {
                    headers: [
                        {
                            text: '權限',
                            value: 'name'
                        },
                        {
                            text: '用途',
                            value: 'desc'
                        }
                    ],
                    items: []
                }
            }
        },
        mounted() {
            this.getUserAcceess()
        },
        methods: {
            async getUserAcceess() {
                const userAccess = await this.$fetchData( API_PATH )
                this.data.userAccesses = userAccess
                this.resetSearch()
            },
            modalCreateUserAccess() {
                this.modal = {
                    name: 'Create',
                    userAccess: null
                }
            },
            modalUpdateUserAccess( data ) {
                this.modal = {
                    name: 'Update',
                    userAccess: data
                } 
            },
            searchData() {
                this.table.items = this.data.userAccesses.filter( data => {
                    return (
                        data.name.match( this.search.text ) ||
                        data.desc.match( this.search.text )
                    )
                })
            },
            resetSearch() {
                this.search.text = ''
                this.table.items = _cloneDeep( this.data.userAccesses )
            }
        }
    }
</script>