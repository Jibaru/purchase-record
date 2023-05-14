import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL, USERS } from '@/config/api'
import { Axios } from 'axios'
import { User } from './dtos/user'
import { useAuthStore } from '@/auth/stores/auth'

export const useUserStore = defineStore('user', () => {
  const users: Ref<User[]> = ref([])
  const totalPages: Ref<number> = ref(0)
  const isCreatingUser: Ref<boolean> = ref(false)
  const isLoadingUsers: Ref<boolean> = ref(false)
  const createErrorMessage: Ref<string | null> = ref(null)

  const { token } = useAuthStore()

  const axios = new Axios({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      Authorization: token
    },
    transformResponse: (data: string) => JSON.parse(data)
  })

  async function load(page: number, perPage: number = 15): Promise<void> {
    isLoadingUsers.value = true
    try {
      const { data } = await axios.get(USERS, {
        params: {
          page: page,
          paginate: perPage
        }
      })

      const responseUsers: {
        id: string
        name: string
        email: string
        permissions: { name: string }[]
      }[] = data.data
      totalPages.value = data.total_pages

      users.value = []

      for (const user of responseUsers) {
        users.value.push(new User(user.id, user.name, user.email, user.permissions))
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      isLoadingUsers.value = false
    }
  }

  async function addPermission(userId: string, name: string) {
    try {
      await axios.post(
        USERS + '/' + userId + '/permissions',
        JSON.stringify({
          name: name
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  async function removePermission(userId: string, name: string) {
    try {
      await axios.delete(USERS + '/' + userId + '/permissions', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          name: name
        })
      })
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  async function create(name: string, email: string, password: string) {
    isCreatingUser.value = true
    try {
      const response = await axios.post(
        USERS + '/signup',
        JSON.stringify({
          name,
          email,
          password
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw new Error(response.data.message)
      }
    } catch (error: any) {
      createErrorMessage.value = error.message
      setTimeout(() => {
        createErrorMessage.value = null
      }, 5000)
    } finally {
      isCreatingUser.value = false
    }
  }

  return {
    load,
    addPermission,
    removePermission,
    create,
    users,
    totalPages,
    isLoadingUsers,
    isCreatingUser,
    createErrorMessage
  }
})
