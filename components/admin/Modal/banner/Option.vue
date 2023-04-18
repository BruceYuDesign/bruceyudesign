<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Option' "
        :can-edit-modal=" A_BANNER_OPTION.patch "
        @close-modal=" closeModal "
        >
        <template #head>
            廣告切換設定
        </template>
        <template #body>
            <AdminFormFieldInput
                label="切換秒數"
                v-model.number=" bannerOption.timing "
                type="number"
                min="0"
                max="20"
                />
        </template>
        <template #foot>
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "
                />
            <AdminFormButton
                v-if=" A_BANNER_OPTION.put "
                text="更新"
                type="primary"
                @click=" updateBanner "
                />
        </template>
    </AdminModalBasic>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const A_BANNER_OPTION = useAuthStore().useAccess( 'bannerOption' )
</script>

<script>
    import { bannerOptionVerify } from '~~/verify/bannerOption'
    const API_PATH = '/api/admin/bannerOption/'
    export default {
        props: {
            modalName:         String,
            modalBannerOption: Object,
            modalResetData:    Function
        },
        data() {
            return {
                bannerOption: null
            }
        },
        watch: {
            modalName: {
                handler( newValue ) {
                    this.bannerOption = newValue && { ...this.$props.modalBannerOption }
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.bannerOption = null
            },
            async updateBanner() {
                const { data } = bannerOptionVerify( this.bannerOption )
                await this.$fetchData( API_PATH , {
                    method: 'PUT',
                    body: {
                        id: this.bannerOption.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            }
        }
    }
</script>