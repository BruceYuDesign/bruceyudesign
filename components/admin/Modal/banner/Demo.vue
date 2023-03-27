<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Demo' "
        @close-modal=" closeModal "
        >
        <template #head>
            預覽廣告
        </template>
        <template #body>
            <BrandedBanner
                :banners=" modalBanners "
                :timing=" modalBannerOption.timing "
                />
        </template>
        <template #foot>
            <AdminFormButton
                text="關閉"
                type="secondary"
                @click=" closeModal "
                />
        </template>
    </AdminModalBasic>
</template>

<script>
    export default {
        props: {
            modalName:         String,
            modalBanners:      Object,
            modalBannerOption: Object
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
            }
        }
    }
</script>