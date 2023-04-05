<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Logout' "
        @close-modal=" closeModal "
        >
        <template #head>
            確認登出
        </template>
        <template #body>
            <p>
                確認是否要登出？
            </p>
        </template>
        <template #foot>
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "/>
            <AdminFormButton
                text="確認"
                type="danger"
                @click=" confirmLogout "/>
        </template>
    </AdminModalBasic>
</template>

<script>
    const API_PATH = '/api/admin/logout/'
    export default {
        props: {
            modalName: String
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
            },
            async confirmLogout() {
                await this.$fetchData( API_PATH , {
                    method: 'POST'
                })
                window.location = '/login/'
            }
        }
    }
</script>