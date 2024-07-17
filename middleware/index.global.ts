import { useFirebaseClient } from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {
    const hasUser = useFirebaseClient().auth.currentUser

    // Если пользователь авторизован
    if (hasUser) {
        // Если пользователь пытается перейти на /auth/login или /auth/register, перенаправляем на /dashboard
        if (to.path === '/auth/login' || to.path === '/auth/register') {
            return navigateTo('/dashboard')
        }
    } else {
        // Если пользователь не авторизован
        // Если пользователь пытается перейти на любую страницу, кроме /auth/login и /auth/register, перенаправляем на /auth/login
        if (to.path !== '/auth/login' && to.path !== '/auth/register') {
            return navigateTo('/auth/login')
        }
    }

    // Если пользователь пытается перейти на корневой маршрут '/', перенаправляем на /dashboard
    if (to.path === '/') {
        return navigateTo('/dashboard')
    }
})
