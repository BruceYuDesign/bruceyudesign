<template>
    <AdminInfo>
        <template #head>
            <AdminFormButton
                v-if=" A_PROJECT.post "
                text="新增專案"
                type="primary"
                @click=" modalCreateProject "
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
                checkbox-label="text"
                checkbox-value="id"
                :checkboxes=" data.projectTypes "
                v-model=" search.type "
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
        @click-row=" data => modalUpdateProject( data ) "
        >
        <template #item-state="{ state }">
            <div class="w-fit px-3 py-0.5 text-white font-bold rounded-full"
                :class=" state === true ? 'bg-success' : 'bg-danger' "
                >
                {{ state ? '上架' : '下架' }}
            </div>
        </template>
        <template #item-imgs="{ imgs }">
            <div class="w-16 h-16 bg-cover bg-center rounded-xl"
                :style=" `background-image: url(${ imgs[ 0 ].src })` "
                >
            </div>
        </template>
        <template #item-type="{ type }">
            {{ parseProjectType( type ) }}
        </template>
    </AdminTableBasic>
    <AdminModalProjectEdit
        v-model:modal-name=" modal.name "
        v-model:modal-project=" modal.project "
        v-bind:modal-project-types=" data.projectTypes "
        v-bind:modal-reset-data=" getProjects "
        />
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    useAuthStore().canAccessPage( 'project' )
    const A_PROJECT = useAuthStore().useAccess( 'project' )
</script>

<script>
    const API_PATH = '/api/admin/project/'
    export default {
        data() {
            return {
                data: {
                    projects: [],
                    projectTypes: []
                },
                modal: {
                    name: null,
                    project: null
                },
                search: {
                    text: '',
                    type: []
                },
                table: {
                    headers: [
                        {
                            text: '狀態',
                            value: 'state',
                            sortable: true
                        },
                        {
                            text: '標題',
                            value: 'title'
                        },
                        {
                            text: '副標題',
                            value: 'subtitle'
                        },
                        {
                            text: '封面圖片',
                            value: 'imgs'
                        },
                        {
                            text: '類別',
                            value: 'type'
                        }
                    ],
                    items: []
                }
            }
        },
        mounted() {
            this.getProjects()
        },
        methods: {
            async getProjects() {
                const { project , projectType } = await this.$fetchData( API_PATH )
                projectType.sort( ( a , b ) => a.index > b.index ? 1 : -1 )
                project.map( ({ imgs }) => imgs.sort( ( a , b ) => a.page > b.page ? 1 : -1 ) )
                this.data.projectTypes = projectType
                this.data.projects = project
                this.resetSearch()
            },
            modalCreateProject() {
                this.modal = {
                    name: 'Create',
                    project: null
                }
            },
            modalUpdateProject( data ) {
                this.modal = {
                    name: 'Update',
                    project: data
                }
            },
            parseProjectType( data ) {
                let parseData = _clone( data )
                for( let index in parseData ) {
                    for( let type of this.data.projectTypes ) {
                        parseData[ index ] = parseData[ index ].replace( type.id , type.text )
                    }
                }
                return parseData.join( ' , ' )
            },
            searchData() {
                this.table.items = this.data.projects.filter( data => {
                    let judge = true
                    for( let type of this.search.type ) {
                        if( !data.type.includes( type ) ) {
                            return judge = false
                        }
                    }
                    return (
                        judge &&
                        (
                            data.title   .match( this.search.text ) ||
                            data.subtitle.match( this.search.text ) ||
                            data.desc    .match( this.search.text )
                        )
                    )
                })
            },
            resetSearch() {
                this.search = {
                    type: [],
                    text: ''
                }
                this.table.items = _cloneDeep( this.data.projects )
            }
        }
    }
</script>