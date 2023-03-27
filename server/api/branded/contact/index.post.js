// ! 待優化，先使用前端emailjs套件（使用後端套件要錢）

import emailjs , { EmailJSResponseStatus } from '@emailjs/nodejs'
import { contactVerify } from '~/verify/contact'

export default defineEventHandler( async event => {
    const { data } = await readBody( event )
    contactVerify( data )
    try {
        await emailjs.send( 'service_j5bpzhy' , 'template_uq3szmn' , data , {
                publicKey: '48hEci00blM8bCx6h',
                privateKey: 'p7W88gxBt1qDImkoEy5PO', 
            })
        return 'SUCCESS'
    }
    catch( error ) {
        if( error instanceof EmailJSResponseStatus ) {
            throw createError( error )
        }
    }
})