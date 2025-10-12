import axios, { type AxiosInstance, type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

import { getAccessTokenFromLS, setAccesTokenToLS, setProfileFromLS } from './auth'

// Provide minimal typings for Vite's import.meta.env so we avoid `any` and
// satisfy lint/TS rules when accessing VITE_* variables at runtime.
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string
    readonly VITE_SOCKET_BASE_URL?: string
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    // Prefer VITE_API_BASE_URL when provided (set in the build environment).
    // Fallback to '/api' for SSR/tests. We prefer a configured VITE_API_BASE_URL
    // so the client talks to the API host defined in env, not inferred from
    // the client's origin.
    let envBase = 'https://fsppv7.ssivn.fun'
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
      envBase = String(import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '')
    }
    const baseURL = envBase || '/api'
    console.log('API base set to', baseURL)
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.accessToken && config.headers) {
          ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error: AxiosError) => {
        // Ensure rejection reason is an Error
        return Promise.reject(error instanceof Error ? error : new Error(String(error)))
      }
    )

    this.instance.interceptors.response.use((response: AxiosResponse) => {
      const { url } = response.config
      if (url === '/v1/auth/login') {
        const dataProfile = response
        const newUser = dataProfile.data.user
        this.accessToken = response.data.token
        setProfileFromLS(newUser)
        setAccesTokenToLS(this.accessToken)
      } else if (url === '/user/log-out') {
        // intentionally left blank: logout handling can be implemented here
      }
      return response
    })
  }
}

const http = new Http().instance

export default http
