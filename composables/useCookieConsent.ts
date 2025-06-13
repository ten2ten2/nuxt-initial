/**
 * Composable for managing cookie consent state
 * This handles the cookie consent banner logic and provides
 * reactive state for consent status throughout the application
 */
export const useCookieConsent = () => {
  const cookieOptions = {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    default: () => null as boolean | null,
    serializer: {
      read: (value: string) => {
        if (value === 'true') return true
        if (value === 'false') return false
        return null
      },
      write: (value: boolean | null) => String(value)
    },
    // Only access cookies on client-side to prevent hydration mismatch
    server: false
  }

  const consent = useCookie('cookie_consent', cookieOptions)

  return {
    consent: readonly(consent),
    hasConsent: computed(() => consent.value !== null),
    isAccepted: computed(() => consent.value === true),
    isDeclined: computed(() => consent.value === false),
    accept: () => { consent.value = true },
    decline: () => { consent.value = false },
    reset: () => { consent.value = null }
  }
}