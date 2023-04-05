<template>
    <div class="w-11/12 max-w-sm bg-white py-12 px-6 flex flex-col gap-4 items-center rounded-2xl shadow-md
        sm:px-12"
        >
        <img class="ml-0 mr-auto w-4/5"
            src="/logo.svg"
            alt="BRUCE YU DESIGN"
            >
        <hr class="m-2"/>
        <AdminFormFieldInput
            label="帳號"
            maxlength="20"
            v-model=" data.account "
            />
        <AdminFormFieldInput
            label="密碼"
            type="password"
            maxlength="20"
            v-model=" data.password "
            />
        <AdminFormButton
            class="!w-full mt-4"
            text="登入"
            type="primary"
            @click=" handleLogin "
            />
        <hr class="mt-4 mb-2"/>
        <a class="font-bold text-sm text-secondary-200
            hover:text-primary-300"
            href="/"
            >
            BRUCE YU DESIGN
        </a>
    </div>
    <AdminLoading/>
</template>

<script setup>
    useHead({
        title: '管理系統',
        meta: [
            { name: 'robots' , content: 'noindex, nofollow' }
        ]
    })
</script>

<script>
    import { useLoadStore } from '~/stores/isLoading'
    import { loginVerify } from '~/verify/login'
    export default {
        data() {
            return {
                data: {
                    account:  '',
                    password: ''
                }
            }
        },
        methods: {
            async handleLogin() {
                const { data } = loginVerify( this.data )
                await this.$fetchData( '/api/login/' , {
                    method: 'POST',
                    body: {
                        data: data
                    }
                })
                useLoadStore().isLoading = true
                window.location = '/admin/'
            }
        }
    }
</script>