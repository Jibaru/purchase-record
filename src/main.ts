import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import { addIcons } from './config/icons'

import App from './App.vue'
import router from './router'
import BaseAlert from './shared/components/base-alert.vue'
import BaseBadge from './shared/components/base-badge.vue'
import BaseButton from './shared/components/base-button.vue'
import BaseCard from './shared/components/base-card.vue'
import BaseFileInput from './shared/components/base-file-input.vue'
import BaseInput from './shared/components/base-input.vue'
import BaseLabel from './shared/components/base-label.vue'
import BasePagination from './shared/components/base-pagination.vue'
import BaseTable from './shared/components/base-table.vue'
import BaseTitle from './shared/components/base-title.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('base-alert', BaseAlert)
app.component('base-badge', BaseBadge)
app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-file-input', BaseFileInput)
app.component('base-input', BaseInput)
app.component('base-label', BaseLabel)
app.component('base-pagination', BasePagination)
app.component('base-table', BaseTable)
app.component('base-title', BaseTitle)

addIcons(app)

app.mount('#app')
