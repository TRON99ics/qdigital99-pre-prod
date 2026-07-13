import { useEffect, useState } from 'react'
import { siteConfig } from '../data/siteConfig'

const BUILD_TIME_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

let cachedConfig = null
let configPromise = null

function getContactConfigUrl() {
  const contactUrl = siteConfig.contactApiUrl
  if (contactUrl.endsWith('/api/contact')) {
    return contactUrl.replace(/\/api\/contact$/, '/api/contact-config')
  }
  return '/api/contact-config'
}

async function fetchTurnstileConfig() {
  if (cachedConfig) return cachedConfig
  if (configPromise) return configPromise

  configPromise = fetch(getContactConfigUrl())
    .then(async (response) => {
      if (!response.ok) throw new Error('config fetch failed')
      return response.json()
    })
    .then((data) => {
      const siteKey = data.turnstileSiteKey || BUILD_TIME_SITE_KEY
      cachedConfig = {
        siteKey,
        required: Boolean(data.turnstileRequired),
        enabled: Boolean(siteKey),
      }
      return cachedConfig
    })
    .catch(() => {
      cachedConfig = {
        siteKey: BUILD_TIME_SITE_KEY,
        required: false,
        enabled: Boolean(BUILD_TIME_SITE_KEY),
      }
      return cachedConfig
    })
    .finally(() => {
      configPromise = null
    })

  return configPromise
}

export function useTurnstileConfig() {
  const [config, setConfig] = useState(
    cachedConfig || {
      siteKey: BUILD_TIME_SITE_KEY,
      required: false,
      enabled: Boolean(BUILD_TIME_SITE_KEY),
      loading: !cachedConfig,
    },
  )

  useEffect(() => {
    let cancelled = false

    fetchTurnstileConfig().then((next) => {
      if (!cancelled) {
        setConfig({ ...next, loading: false })
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return config
}
