
'use client'

import * as React from 'react'

import { type SessionData } from '../lib/lucia'

const SessionContext = React.createContext({} as SessionData)

interface SessionProviderProps {
  session: SessionData
  children: React.ReactNode
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}

export const useSession = () => React.useContext(SessionContext)