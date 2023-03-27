<template>
    <AdminModalBasic
        :open-modal=" modalName === 'Update' || modalName === 'Create' "
        :can-edit-modal=" modalName === 'Create' || A_PROJECT.put "
        @close-modal=" closeModal "
        >
        <template #head>
            {{ modalProject ? modalProject.title : '新增專案' }}
        </template>
        <template #body>
            <AdminFormToggleButton
                label="狀態"
                true-text="上架"
                false-text="下架"
                v-model=" project.state "
                />
            <hr/>
            <div class="w-full max-w-full" style="overflow: overlay;">
                <div class="mt-4 mb-8 w-fit flex flex-row">
                    <AdminDraggable
                        class="w-fit flex flex-row"
                        v-model=" project.imgs "
                        @change=" resetImageIndex "
                        item-key="page">
                        <template #item="{ element , index }">
                            <div class="relative w-40 h-40 bg-cover bg-center rounded cursor-move mr-4"
                                :style=" `background-image: url(${ element.src })` "
                                >
                                <button class="absolute -right-1.5 -top-1.5 w-6 h-6 grid place-items-center rounded-full bg-slate-400 text-white
                                    hover:bg-rose-400"
                                    @click=" deleteImage( index ) "
                                    type="button"
                                    >
                                    <font-awesome-icon icon="fa-solid fa-xmark" />
                                </button>
                            </div>
                        </template>
                    </AdminDraggable>
                    <AdminFormImage
                        v-if=" project.imgs.length < 10 "
                        class="w-40 h-40 rounded"
                        accept-type="image/jpeg"
                        :can-delete=" false "
                        :compress-quality=" 0.75 "
                        :compress-mimeType=" [ 'image/jpeg' ] "
                        :compress-height=" 800 "
                        :compress-width=" 800 "
                        @change-img=" addImage "
                        />
                </div>
            </div>
            <hr/>
            <AdminFormCheckboxList
                label="類別"
                checkbox-label="text"
                checkbox-value="id"
                :checkboxes=" modalProjectTypes "
                v-model=" project.type "
                />
            <hr/>
            <AdminFormFieldInput
                label="標題"
                v-model=" project.title "
                />
            <AdminFormFieldInput
                label="副標題"
                v-model=" project.subtitle "
                />
            <hr/>
            <AdminFormFieldInput
                label="專案日期"
                type="date"
                v-model=" project.date "
                />
            <hr/>
            <AdminFormFieldInput
                label="連結名稱"
                v-model=" project.linkName "
                />
            <AdminFormFieldInput
                label="連結網址"
                v-model=" project.linkHref "
                />
            <hr/>
            <AdminFormFieldTextarea
                label="內文"
                rows="10"
                v-model=" project.desc "
                />
        </template>
        <template #foot>
            <AdminFormButton
                text="取消"
                type="secondary"
                @click=" closeModal "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_PROJECT.delete "
                text="刪除"
                type="danger"
                @click=" deleteProject "
                />
            <AdminFormButton
                v-if=" modalName === 'Update' && A_PROJECT.put "
                text="更新"
                type="primary"
                @click=" updateProject "
                />
            <AdminFormButton
                v-if=" modalName === 'Create' && A_PROJECT.post "
                text="建立"
                type="primary"
                @click=" addProject "
                />
        </template>
    </AdminModalBasic>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const A_PROJECT = useAuthStore().useAccess( 'project' )
</script>

<script>
    import { projectVerify } from '~/verify/project'
    const API_PATH = '/api/admin/project/'
    export default {
        props: {
            modalName:         String,
            modalProject:      Object,
            modalProjectTypes: Object,
            modalResetData:    Function
        },
        data() {
            return{
                default: {
                    state:    false,
                    imgs:     [],
                    title:    '',
                    subtitle: '',
                    type:     [],
                    date:     '',
                    linkName: '',
                    linkHref: '',
                    desc:     '',
                },
                project: null
            }
        },
        watch: {
            modalName: function() {
                if( this.$props.modalName === 'Create' ) {
                    this.project = _cloneDeep( this.default )
                }
                else if( this.$props.modalName === 'Update' ) {
                    this.project = _cloneDeep( this.$props.modalProject )
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( 'update:modalName' , null )
                this.$emit( 'update:modalProject' , null )
                this.project = null
            },
            resetImageIndex() {
                for( let index in this.project.imgs ) {
                    this.project.imgs[ index ].page = Number( index )
                }
            },
            addImage( value ) {
                this.project.imgs.push({
                    src: value,
                    page: null
                })
                this.resetImageIndex()
            },
            deleteImage( index ) {
                this.project.imgs.splice( index , 1 )
                this.resetImageIndex()
            },
            async addProject() {
                const { data } = projectVerify( this.project )
                await this.$fetchData( API_PATH , {
                    method: 'POST',
                    body: {
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async updateProject() {
                const { data } = projectVerify( this.project )
                await this.$fetchData( API_PATH , {
                    method: 'PUT',
                    body: {
                        id: this.project.id,
                        data: data
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            },
            async deleteProject() {
                await this.$fetchData( API_PATH , {
                    method: 'DELETE',
                    body: {
                        id: this.project.id
                    }
                })
                this.closeModal()
                this.$props.modalResetData()
            }
        }
    }
</script>