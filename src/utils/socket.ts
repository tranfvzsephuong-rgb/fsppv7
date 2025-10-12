import { io, Socket } from 'socket.io-client'

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

// Prefer VITE_SOCKET_BASE_URL when present. Use a safe fallback to the current
// origin + '/ws' when running in the browser. Keep SSR/tests safe by avoiding
// any window access when it's not available.
let socketEnv = 'wss://sppv7.ssivn.fun/ws'
if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SOCKET_BASE_URL) {
  socketEnv = String(import.meta.env.VITE_SOCKET_BASE_URL).trim()
}

const createSocketFromEnv = (envValue: string): Socket | null => {
  if (!envValue) return null

  // If the env includes a full URL (wss:// or ws://) and possibly a pathname
  // (e.g. wss://host/ws), parse it so we can pass origin and path separately
  // to socket.io-client. If parsing fails, pass the value directly.
  try {
    const u = new URL(envValue)
    const origin = u.origin
    const pathname = u.pathname && u.pathname !== '/' ? u.pathname.replace(/\/$/, '') : '/ws'
    console.log('[socket] connecting to socket env origin:', origin, 'path:', pathname)
    return io(origin, { path: pathname, transports: ['websocket'], autoConnect: true })
  } catch (err) {
    // Fallback: pass the env value directly (it might be a relative path)
    console.log('[socket] connecting to socket env (raw):', envValue)
    return io(envValue, { transports: ['websocket'], autoConnect: true })
  }
}

const socket: Socket = (() => {
  const fromEnv = createSocketFromEnv(socketEnv)
  if (fromEnv) return fromEnv
  // If no VITE_SOCKET_BASE_URL is provided we intentionally DO NOT fall back
  // to the client's origin. The app should be configured via env to point to
  // the API/socket host. For SSR or tests we return an unconnected socket so
  // consumers can still import this module without throwing.
  console.warn(
    `[socket] VITE_SOCKET_BASE_URL not set — socket will remain unconnected. Set VITE_SOCKET_BASE_URL in your environment to enable realtime connections.`
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return io(undefined as any)
})()

export default socket
