export const usePopupStore = defineStore( 'popup' , {
    state: () => {
        return {
            text: '',
            type: '',
            isShown: false
        }
    },
    actions: {
        setPopup( text , type ) {
            this.isShown = false
            setTimeout( () => {
                this.text = text
                this.type = type
                this.isShown = true
            } , 1 )
        }
    }
})