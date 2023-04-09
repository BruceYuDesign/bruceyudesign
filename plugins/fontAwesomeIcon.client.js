import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret,
    faTrashCan,
    faArrowUpFromBracket,
    faGripVertical,
    faXmark,
    faCirclePlus,
    faCircleExclamation,
    faHouse,
    faUserGear,
    faUser,
    faRectangleAd,
    faBriefcase,
    faSuitcase,
    faCircleCheck,
    faSquareCheck,
    faSquareXmark,
    faHandPointer,
    faComment,
    faComments,
    faBars,
    faListCheck,
    faClipboardCheck,
    faCircleChevronLeft,
    faCircleChevronRight,
    faLink,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin( ( nuxtApp ) => {
    library.add(
        faUserSecret,
        faTrashCan,
        faArrowUpFromBracket,
        faGripVertical,
        faXmark,
        faCirclePlus,
        faCircleExclamation,
        faHouse,
        faUserGear,
        faUser,
        faRectangleAd,
        faBriefcase,
        faSuitcase,
        faCircleCheck,
        faSquareCheck,
        faSquareXmark,
        faHandPointer,
        faComment,
        faComments,
        faBars,
        faListCheck,
        faClipboardCheck,
        faCircleChevronLeft,
        faCircleChevronRight,
        faLink,
        faCircleXmark
    )
    config.autoAddCss = false
    nuxtApp.vueApp.component( 'FontAwesomeIcon' , FontAwesomeIcon , {} )
})