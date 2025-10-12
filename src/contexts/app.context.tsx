/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS, clearLS } from '~/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: any | null
  setProfile: React.Dispatch<React.SetStateAction<any | null>>
  reset: () => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null
})
const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode; defaultValue?: AppContextInterface }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<any | null>(initialAppContext.profile)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
