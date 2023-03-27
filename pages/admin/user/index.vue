<template>
    <AdminInfo>
        <template #head>
            <AdminFormButton
                v-if=" A_USER.post "
                text="新增帳號"
                type="primary"
                @click=" modalCreateUser "
                />
        </template>
        <template #body>
            <AdminFormFieldInput
                label="文字搜尋"
                type="text"
                v-model=" search.text "
                />
            <AdminFormCheckboxList
                label="權限篩選"
                checkbox-label="name"
                checkbox-value="id"
                :checkboxes=" data.userAccesses "
                v-model=" search.access "
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
        @click-row=" data => modalUpdateUser( data ) "
        >
        <template #item-state="{ state }">
            <div class="w-fit px-3 py-0.5 text-white font-bold rounded-full"
                :class=" state === true ? 'bg-success' : 'bg-danger' "
                >
                {{ state ? '啟用' : '停用' }}
            </div>
        </template>
        <template #item-avatar="{ avatar }">
            <div class="w-16 h-16 bg-cover bg-center rounded-full"
                :style=" `background-image: url(${ avatar || '/default_user.png' })` "
                >
            </div>
        </template>
        <template #item-access="{ access }">
            {{ parseUserAccess( access ) }}
        </template>
    </AdminTableBasic>
    <AdminModalUserEdit
        v-model:modal-name=" modal.name "
        v-model:modal-user=" modal.user "
        v-bind:modal-user-accesses=" data.userAccesses "
        v-bind:modal-reset-data=" getUsers "
        />
    <AdminModalUserPassword
        v-model:modal-name=" modal.name "
        v-model:modal-user=" modal.user "
        />
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    useAuthStore().canAccessPage( 'user' )
    const A_USER = useAuthStore().useAccess( 'user' )
</script>

<script>
    const API_PATH = '/api/admin/user/'
    export default {
        data() {
            return {
                data: {
                    users: [],
                    userAccesses: []
                },
                modal: {
                    name: null,
                    user: null
                },
                search: {
                    text: '',
                    access: []
                },
                table: {
                    headers: [
                        {
                            text: '狀態',
                            value: 'state',
                            sortable: true
                        },
                        {
                            text: '帳號',
                            value: 'account',
                            sortable: true
                        },
                        {
                            text: '名稱',
                            value: 'name',
                            sortable: true
                        },
                        {
                            text: '頭貼',
                            value: 'avatar'
                        },
                        {
                            text: '權限',
                            value: 'access',
                            sortable: true
                        }
                    ],
                    items: []
                }
            }
        },
        mounted() {
            this.getUsers()
        },
        methods: {
            async getUsers() {
                const { user , userAccess } = await this.$fetchData( API_PATH )
                this.data.userAccesses = userAccess
                this.data.users = user
                this.resetSearch()
            },
            modalCreateUser() {
                this.modal = {
                    name: 'Create',
                    user: null
                }
            },
            modalUpdateUser( data ) {
                this.modal = {
                    name: 'Update',
                    user: data
                }
            },
            parseUserAccess( data ) {
                for( let access of this.data.userAccesses ) {
                    data = data.replace( access.id , access.name )
                }
                return data
            },
            searchData() {
                this.table.items = this.data.users.filter( data => {
                    let judge = true
                    for( let access of this.search.access ) {
                        if( !data.access.includes( access ) ) {
                            return judge = false
                        }
                    }
                    return (
                        judge &&
                        (
                            data.account.match( this.search.text ) ||
                            data.name   .match( this.search.text )
                        )
                    )
                })
            },
            resetSearch() {
                this.search = {
                    access: [],
                    text: ''
                }
                this.table.items = _cloneDeep( this.data.users )
            }
        }
    }
</script>