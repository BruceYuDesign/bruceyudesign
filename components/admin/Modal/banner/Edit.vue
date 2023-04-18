<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Update' || modalName === 'Create' "
        :can-edit-modal=" modalName === 'Create' || A_BANNER.put "
        @close-modal=" closeModal "
        >
        <template #head>
            {{ modalBanner ? modalBanner.tool : '新增廣告' }}
        </template>
        <template #body>
            <BrandedBanner
                :banners=" [ banner ] "
                />
            <hr/>
            <AdminFormFieldInput
                label="使用工具"
                v-model=" banner.tool "
                />
            <AdminFormFieldInput
                label="用途"
                v-model=" banner.use "
                />
            <hr/>
            <div class="flex flex-row gap-6">
                <AdminFormColor
                    label="起始顏色"
                    v-model=" banner.gradient.start "
                    />
                <AdminFormColor
                    label="結束顏色"
                    v-model=" banner.gradient.end "
                    />
            </div>
            <hr/>
            <AdminFormImage
                class="w-48 h-48 rounded-2xl"
                default-img=""
                accept-type="image/png"
                :can-edit=" true "
                :can-delete=" true "
                suggestion="（建議尺寸：600 x 600）"
                :compress-quality=" 1 "
                :compress-mime-type=" [ 'image/png' ] "
                :compress-height=" 600 "
                :compress-width=" 600 "
                v-model=" banner.img "
                />
        </template>
        <template #foot>
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_BANNER.delete "
                text="刪除"
                type="danger"
                @click=" deleteBanner "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_BANNER.put "
                text="更新"
                type="primary"
                @click=" updateBanner "
                />
            <AdminFormButton
                v-if=" modalName === 'Create' && A_BANNER.post "
                text="建立"
                type="primary"
                @click=" addBanner "
                />
        </template>
    </AdminModalBasic>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const A_BANNER = useAuthStore().useAccess( 'banner' )
</script>

<script>
    import { bannerVerify } from '~/verify/banner'
    const API_PATH = '/api/admin/banner/'
    export default {
        props: {
            modalName:      String,
            modalBanner:    Object,
            modalResetData: Function
        },
        data() {
            return {
                default: {
                    tool: '',
                    use:  '',
                    img:  '',
                    gradient: {
                        start: '#e2e8f0',
                        end:   '#e2e8f0'
                    }
                },
                banner: null
            }
        },
        watch: {
            modalName: {
                handler( newValue ) {
                    this.banner = newValue === 'Update' ?
                        _cloneDeep( this.$props.modalBanner ) :
                        _cloneDeep( this.default )
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.$emit( 'update:modalBanner' , null )
                this.banner = null
            },
            async addBanner() {
                const { data } = bannerVerify( this.banner )
                await this.$fetchData( API_PATH , {
                    method: 'POST',
                    body: {
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async updateBanner() {
                const { data } = bannerVerify( this.banner )
                await this.$fetchData( API_PATH , {
                    method: 'PUT',
                    body: {
                        id: this.banner.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async deleteBanner() {
                await this.$fetchData( API_PATH , {
                    method: 'DELETE',
                    body: {
                        id: this.banner.id
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            }
        }
    }
</script>