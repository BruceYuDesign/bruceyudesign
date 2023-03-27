export const useLoadStore = defineStore( 'load' , {
    state: () => {
        return {
            isLoading: false
        }
    },
    actions: {
        setLoading( boolean ) {
            if( !process.client ) { return }
            if( boolean ) {
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