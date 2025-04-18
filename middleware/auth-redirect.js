// middleware/auth-localized.js
export default function ({ route, redirect, app, $auth }) {
  const locale = app.i18n.locale || 'en'

  const isLoginRoute = route.name?.startsWith('login') // nomi 'login' bilan boshlansa
  const isUserLoggedIn = $auth.loggedIn

  // 1. Agar foydalanuvchi login bo'lmagan bo‘lsa va login sahifasida bo‘lmasa → login page'ga yo‘naltiramiz
  if (!isUserLoggedIn && !isLoginRoute) {
    return redirect(app.localePath('login'))
  }

  // 2. Agar foydalanuvchi login bo‘lsa va login sahifasida bo‘lsa → dashboard'ga yo‘naltiramiz
  if (isUserLoggedIn && isLoginRoute) {
    return redirect(app.localePath('user-management'))
  }
}
