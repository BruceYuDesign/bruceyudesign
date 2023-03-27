<template>
    <div class="flex flex-row gap-4">
        <AdminFormButton
            v-if=" A_BANNER.post "
            text="新增廣告"
            type="primary"
            @click=" modalCreateBanner "
            />
        <AdminFormButton
            v-if=" A_BANNER_OPTION.put "
            text="廣告切換設定"
            type="secondary"
            @click=" modalBannerOption "
            />
        <AdminFormButton
            text="預覽廣告"
            type="secondary"
            @click=" modalBannerDemo "
            />
    </div>
    <AdminTableDraggable
        :headers=" table.headers "
        v-model=" data.banners "
        item-key="index"
        :can-drag=" A_BANNER.patch "
        @click-row=" modalUpdateBanner "
        :save-items=" saveBannerIndex "
        >
        <template #item-index="{ index }">
            {{ index + 1 }}
        </template>
        <template #item-img="{ img , gradient }">
            <div class="flex items-center justify-center h-16 w-24 p-0.5 rounded-xl"
                :style="`background-image:linear-gradient(to right top,
                    ${ gradient.start },
                    ${ gradient.end })`">
                <img class="h-full w-auto"
                    :src=" img ">
            </div>
        </template>
    </AdminTableDraggable>
    <AdminModalBannerEdit
        v-model:modal-name=" modal.name "
        v-model:modal-banner=" modal.banner "
        v-bind:modal-reset-data=" getBanners "
        />
    <AdminModalBannerOption
        v-model:modal-name=" modal.name "
        v-bind:modal-banner-option=" data.bannerOption "
        v-bind:modal-reset-data=" getBanners "
        />
    <AdminModalBannerDemo
        v-model:modal-name=" modal.name "
        v-bind:modal-banners=" data.banners "
        v-bind:modal-banner-option=" data.bannerOption "
        />
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    useAuthStore().canAccessPage( 'banner' )
    const A_BANNER = useAuthStore().useAccess( 'banner' )
    const A_BANNER_OPTION = useAuthStore().useAccess( 'bannerOption' )
</script>

<script>
    import { bannerIndexVerify } from '~/verify/banner'
    const API_PATH = '/api/admin/banner/'
    export default {
        data() {
            return{
                data: {
                    banners: [],
                    bannerOption: {}
                },
                modal: {
                    name:   null,
                    banner: null
                },
                table: {
                    headers: [
                        {
                            text: '順序',
                            value: 'index'
                        },
                        {
                            text: '工具',
                            value: 'tool'
                        },
                        {
                            text: '使用',
                            value: 'use'
                        },
                        {
                            text: '縮圖',
                            value: 'img'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.getBanners()
        },
        methods: {
            async getBanners() {
                const { banner , bannerOption } = await this.$fetchData( API_PATH )
                banner.sort( ( a , b ) => a.index > b.index ? 1 : -1 )
                this.data.bannerOption = bannerOption
                this.data.banners = banner
            },
            modalCreateBanner() {
                this.modal = {
                    name: 'Create',
                    banner: null
                }
            },
            modalUpdateBanner( data ) {
                this.modal = {
                    name: 'Update',
                    banner: data
                }
            },
            modalBannerOption() {
                this.modal = {
                    name: 'Option'
                }
            },
            modalBannerDemo() {
                this.modal = {
                    name: 'Demo'
                }
            },
            async saveBannerIndex() {
                const { data } = bannerIndexVerify( this.data.banners )
                await this.$fetchData( API_PATH , {
                    method: 'PATCH',
                    body: {
                        data: data
                    }
                })
                this.getBanners()
            }
        }
    }
</script>