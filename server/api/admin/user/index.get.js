import { getDatas } from '~/server/db'

export default defineEventHandler( async event => {
    return Promise.all([
        getDatas( 'userAccess' , [ 'name' ] ),
        getDatas( 'user' , [ 'state' , 'account' , 'name' , 'avatar' , 'access' ] )
    ])
    .then( response => {
        return {
            userAccess: response[ 0 ],
            user: response[ 1 ]
        }
    })
})