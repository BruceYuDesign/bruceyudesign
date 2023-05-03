<template>
    <div class="image">
        <div class="image-border"
            v-bind=" $attrs "
            :style=" `background-image: url( ${ defaultImg } )` "
            >
            <!-- img -->
            <img class="image-main" 
                :src=" modelValue "
                >
            <!-- overlay -->
            <div class="image-overlay"
                v-if=" canEdit "
                >
                <!-- remove -->
                <button class="image-button
                    text-danger-500"
                    v-if=" canDelete "
                    @click=" removeImg "
                    type="button"
                    >
                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                </button>
                <!-- upload -->
                <label class="image-button
                    text-primary"
                    >
                    <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
                    <input
                        :accept=" acceptType "
                        @change=" uploadImg "
                        style= "display: none "
                        type="file"
                        >
                </label>
            </div>
        </div>
        <!-- suggestion -->
        <span class="image-suggestion"
            v-if=" suggestion "
            >
            {{ suggestion }}
        </span>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            defaultImg: {
                type: String,
                default: ''
            },
            acceptType: {
                type: String,
                default: 'image/png,image/jpeg'
            },
            suggestion:{
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            },
            canDelete: {
                type: Boolean,
                default: true
            },
            compressQuality: {
                type: Number,
                default: 0.75
            },
            compressHeight: {
                type: Number,
                default: 500
            },
            compressWidth: {
                type: Number,
                default: 500
            },
            compressMimeType: {
                type: [ String , Array ],
                default: [ 'image/jpeg' ]
            },
            modelValue: {
                type: String,
                default: ''
            }
        },
        methods: {
            removeImg() {
                this.$emit( 'update:modelValue' , '' )
            },
            uploadImg( event ) {
                const { $ImageCompressor } = useNuxtApp()
                new $ImageCompressor({
                    file:     event.target.files[ 0 ],
                    quality:  this.$props.compressQuality,
                    mimeType: this.$props.compressMimeType,
                    width:    this.$props.compressWidth,
                    height:   this.$props.compressHeight,
                    beforeDraw: () => {
                        event.target.setAttribute( 'type' , 'text' )
                    },
                    success: result => {
                        event.target.setAttribute( 'type' , 'file' )
                        $ImageCompressor.file2DataUrl( result , url => {
                            this.$emit( 'update:modelValue' , url )
                            this.$emit( 'changeImg' , url )
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .image {
        @apply w-fit flex flex-col items-center;
    }
    .image-border {
        @apply relative bg-cover bg-center bg-secondary-200 border-4 border-secondary-200 overflow-hidden;
    }
    .image-main {
        @apply w-full h-full object-cover;
    }
    .image-main:not( [ src ] ),
    .image-main[ src = "" ] {
        @apply hidden;
    }
    .image-overlay {
        @apply absolute top-0 right-0 bottom-0 left-0 w-full h-full flex flex-row items-center justify-center gap-4 bg-black/75 opacity-0
        hover:opacity-100;
    }
    .image-button {
        @apply text-lg cursor-pointer;
    }
    .image-suggestion {
        @apply mt-2 text-secondary;
    }
</style>