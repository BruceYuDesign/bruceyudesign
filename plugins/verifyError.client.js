import { usePopupStore } from '~/stores/popup'

// 前端 verify 資料驗證
export default defineNuxtPlugin( nuxtApp => {
    nuxtApp.vueApp.config.errorHandler = error => {
        const { statusMessage , statusCode } = error
        if( statusCode === 400 ) {
            const { setPopup } = usePopupStore()
            setPopup( statusMessage , 'danger' )
        }
    }
})