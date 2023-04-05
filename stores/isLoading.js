export const useLoadStore = defineStore( 'load' , {
    state: () => {
        return {
            isLoading: false
        }
    },
    actions: {
        setLoading( state ) {
            if( !process.client ) { return }
            if( state ) {
                this.isLoading = true
                document.body.style.overflow = 'hidden'
            }
            else {
                this.isLoading = false
                document.body.style.overflow = 'auto'
            }
        }
    }
})