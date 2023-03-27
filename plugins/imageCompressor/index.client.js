import ImageCompressor from 'js-image-compressor'

export default defineNuxtPlugin( () => {
    return {
        provide: {
            ImageCompressor
        }
    }
})