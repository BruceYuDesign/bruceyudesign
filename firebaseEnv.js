/**
 * ./.output/server/package.json 的依賴
 * @mapbox/node-pre-gyp/lib/util/nw-pre-gyp
 * 無法部署在 firebase-functions
 */
const fs = require('fs')

fs.readFile( './.output/server/package.json' , 'utf8' , ( error , data ) => {
    if( error ) throw error

    const packageJson = JSON.parse( data )
    delete packageJson.dependencies[ '@mapbox/node-pre-gyp/lib/util/nw-pre-gyp' ]
    const modifiedPackageJson = JSON.stringify( packageJson , null , 2 )

    fs.writeFile( './.output/server/package.json' , modifiedPackageJson , 'utf8' , error => {
        if( error ) throw error
        console.log( 'Successfully' )
    })
})