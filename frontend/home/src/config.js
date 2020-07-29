import getConfig from 'next/config'
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()
const { BACKEND_SERVICE_URL } = serverRuntimeConfig
const { BACKEND_DOMAIN_URL } = publicRuntimeConfig

const ROOT_URL = process.browser ? BACKEND_DOMAIN_URL : BACKEND_SERVICE_URL

export {
  ROOT_URL
}
