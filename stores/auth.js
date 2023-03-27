export const useAuthStore = defineStore( 'auth' , {
    state: () => {
        return {
            auth: {
                profile: null,
                access: null
            }
        }
    },
    actions: {
        async fetchAuth() {
            const { data: auth , error } = await useFetch( '/api/admin/' , { method: 'POST' } )
            if( error.value ) {
                throw createError( error.value )
            }
            this.auth = auth
        },
        useAccess( path ) {
            return this.auth.access[ path ]
        },
        canAccessPage( path ) {
            if( !this.auth.access[ path ].get ) {
                throw showError({
                    statusCode: 403,
                    statusMessage: 'Forbidden'
                })
            }
        }
    }
})