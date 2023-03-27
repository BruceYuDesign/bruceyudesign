let gradientTimer

export function gradientAnimate({
    duration: duration,
    from: {
        startColor: startColor1,
        endColor: endColor1
    },
    to: {
        startColor: startColor2,
        endColor: endColor2
    },
    bindColor: callback
}) {
    let counter = 1
    let limit = duration / 25

    // 色階
    const step = ( from , to ) => {
        let hex = parseInt( from + ( to - from ) / limit * counter ).toString( 16 )
        return hex.length < 2 ? '0' + hex : hex
    }

    // 拆解
    const split = ( color ) => {
        return {
            red:   parseInt( color.substr( 1 , 2 ) , 16 ),
            green: parseInt( color.substr( 3 , 2 ) , 16 ),
            blue:  parseInt( color.substr( 5 , 2 ) , 16 )
        }
    }

    // 組合
    const color = ( from , to ) => {
        let red   = step( split( from ).red,   split( to ).red   )
        let green = step( split( from ).green, split( to ).green )
        let blue  = step( split( from ).blue,  split( to ).blue  )
        return `#${ red + green + blue }`
    }

    // 變換顏色
    const translate = () => {
        if ( counter <= limit ) {
            callback(
                color( startColor1 , startColor2 ),
                color( endColor1   , endColor2   )
            )
            counter++
        } else {
            clearInterval( gradientTimer )
        }
    }

    // 計時
    clearInterval( gradientTimer )
    gradientTimer = setInterval( translate , 25 )
}