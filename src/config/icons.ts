import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faBox,
  faFileInvoice,
  faHome,
  faMoneyBill,
  faRightFromBracket,
  faTruckField,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faBox)
library.add(faFileInvoice)
library.add(faHome)
library.add(faMoneyBill)
library.add(faRightFromBracket)
library.add(faTruckField)
library.add(faUser)

export const addIcons = (app: any): void => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
