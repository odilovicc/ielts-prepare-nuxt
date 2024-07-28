export default defineNuxtRouteMiddleware((to, from) => {
    const hasUser = Boolean(useFirebaseClient().auth.currentUser)

    if (!hasUser && to.path === '/') {
        return navigateTo('/auth/login')
    }
    if (hasUser && to.path === '/auth/login' || to.path === '/auth/register') {
        return navigateTo('/')
    }
})