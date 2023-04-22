import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faFileInvoice, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars)
library.add(faFileInvoice)
library.add(faHome)

export const addIcons = (app: any): void => {
  app.component('font-awesome-icon', FontAwesomeIcon)
}
