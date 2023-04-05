import { version } from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            version
        }
    },
    ssr: true,
    modules: [
        'nuxt-lodash',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    'defineStore',
                    [ 'defineStore' , 'definePiniaStore' ],
                ],
            }
        ]
    ],
    plugins: [
        { src: '~/plugins/fetchData.js' }
    ],
    lodash: {
        prefix: '_',
        prefixSkip: [ 'string' ],
        upperAfterPrefix: false,
        exclude: [ 'map' ]
    },
    app: {
        layoutTransition: { name: 'layout', mode: 'out-in' },
        head: {
            title: 'BRUCE YU DESIGN',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
            ]
        }
    },
    css: [
        '~/assets/css/main.css',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    nitro: {
        preset: 'firebase'
    }
})
