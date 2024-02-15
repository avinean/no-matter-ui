export default function useLanguage() {
  const { setCookie, parseCookie } = useCookies()

  // Get the saved locale from cookies on page load
  const savedLocale = parseCookie('i18n_redirected')

  // Save the selected locale to cookies
  const saveLocale = (locale) => {
    setCookie('i18n_redirected', locale)
  }

  return { savedLocale, saveLocale }
}
