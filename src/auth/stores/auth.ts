import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from './dtos/user'
import { BASE_URL, LOGIN, USERS } from '@/config/api'
import { Axios } from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token: Ref<string | null> = ref(null)
  const user: Ref<User | null> = ref(null)
  const isLogIn: Ref<boolean> = ref(false)
  const isAuthenticated: Ref<boolean> = ref(false)
  const logInErrorMessage: Ref<string | null> = ref(null)

  const axios = new Axios({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json'
    },
    transformResponse: (data: string) => JSON.parse(data)
  })

  function storeToStorage() {
    const data = {
      token: token.value,
      isAuthenticated: isAuthenticated.value,
      user: user.value
    }

    console.log(data)

    localStorage.setItem('auth', JSON.stringify(data))
  }

  function loadFromStorage() {
    const data = localStorage.getItem('auth')

    if (data !== null) {
      const stored: {
        token: string | null
        isAuthenticated: boolean
        user: User | null
      } = JSON.parse(data)

      token.value = stored.token
      isAuthenticated.value = stored.isAuthenticated
      user.value = stored.user
    }
  }

  function clearStorage() {
    localStorage.removeItem('auth')
  }

  async function logInFromPersistence() {
    loadFromStorage()
  }

  async function logIn(email: string, password: string) {
    isLogIn.value = true
    logInErrorMessage.value = null
    try {
      const response = await axios.post(
        USERS + LOGIN,
        JSON.stringify({
          email,
          password
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status == 200) {
        if (response.data.data) {
          const data: { token: string; subject: string; name: string } = response.data.data
          token.value = data.token
          isAuthenticated.value = true
          user.value = { id: data.subject, name: data.name }
          storeToStorage()
        }
      } else {
        throw new Error(response.data.message)
      }
    } catch (error: any) {
      logInErrorMessage.value = error.message
      setTimeout(() => {
        logInErrorMessage.value = null
      }, 5000)
    } finally {
      isLogIn.value = false
    }
  }

  async function logOut() {
    user.value = null
    isAuthenticated.value = false
    token.value = null
    clearStorage()
  }

  return {
    token,
    isLogIn,
    isAuthenticated,
    logInErrorMessage,
    logInFromPersistence,
    logIn,
    logOut
  }
})
