import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";
import { getCSRFTokenFromCookie} from "../http/get-csrf"

export const useAuthStore =  defineStore("authStore", () =>  {
    const user = ref(null)

    const isLoggedIn = computed( () => !!user.value)

    const fetchUser = async () => {
        try{
            const { data } =  await getUser()
            user.value = data

        } catch(error) {
            user.value = null
        }
        
    }


    const handleLogin = async (credentials) => {
        await csrfCookie()
        const headers = {
            'X-XSRF-TOKEN': getCSRFTokenFromCookie(), // Replace getCSRFTokenFromCookie() with a function that retrieves the CSRF token from the cookie
            'Content-Type': 'application/json' // Add other headers as needed
        };
        await login(credentials, headers)
        await fetchUser()

    }


    

    const handleRegister = async (newUser) => {
        await register (newUser)
        await handleLogin( {
            email: newUser.email,
            password: newUser.password
        })
    }

    const handleLogout = async () => {
        const headers = {
            'X-XSRF-TOKEN': getCSRFTokenFromCookie(), // Replace getCSRFTokenFromCookie() with a function that retrieves the CSRF token from the cookie
            'Content-Type': 'application/json' // Add other headers as needed
        };
        await logout(headers)
        user.value = null
    }

    return {
        user,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout
    }
});