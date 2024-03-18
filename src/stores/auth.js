import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";

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


    const getCSRFTokenFromCookie = () => {
        // Split cookies by semicolon and trim each cookie
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        
        // Find the cookie you're interested in
        const myCookie = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='));
  
        // If the cookie is found, extract its value
        if (myCookie) {
          // Extract value from the cookie
          return decodeURIComponent(myCookie.split('=')[1]);
        }
    }

    const handleRegister = async (newUser) => {
        await register (newUser)
        await handleLogin( {
            email: newUser.email,
            password: newUser.password
        })
    }

    const handleLogout = async () => {
        await logout()
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