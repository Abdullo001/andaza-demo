export default function ({ app }) {
  const localePath = app.i18n?.localePath
  console.log(app.i18n);

  if (localePath) {
    const loginPath = localePath('login')
    const homePath = localePath('user-management')

    app.$auth.options.redirect.login = loginPath
    app.$auth.options.redirect.logout = loginPath
    app.$auth.options.redirect.callback = loginPath
    app.$auth.options.redirect.home = homePath
  }
}
