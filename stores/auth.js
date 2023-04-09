export const useAuthStore = defineStore( 'auth' , {
    state: () => {
        return {
            auth: {
                profile: null,
                access: null
            }
        }
    },
    getters: {
        useAccess: state => {
            return path => state.auth.access[ path ]
        },
        canAccessPage: state => {
            return path => {
                if( state.auth.access[ path ].get ) { return }
                throw showError({
                    statusCode: 403,
                    statusMessage: '無此權限，請重新登入'
                })
            }
        }
    },
    actions: {
        async fetchAuth() {
            const { data: auth , error } = await useFetch( '/api/admin/auth/' , { method: 'POST' } )
            if( error.value ) {
                throw createError( error.value )
            }
            this.auth = auth
        }
    }
})