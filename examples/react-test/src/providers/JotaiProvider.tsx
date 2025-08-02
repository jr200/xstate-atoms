import React, { type ReactNode } from 'react'
import { createStore, Provider } from 'jotai'
import { DevTools, useAtomsDebugValue } from 'jotai-devtools'
import 'jotai-devtools/styles.css'

export const store = createStore()

type JotaiProviderProps = {
  debug?: boolean
  children: ReactNode
}

const JotaiProvider = ({ children, debug = false }: JotaiProviderProps) => (
  <Provider store={store}>
    {debug && process.env.NODE_ENV === 'development' && <DebugAtoms />}
    {debug && <DevTools store={store} />}
    {children}
  </Provider>
)

export default JotaiProvider

const DebugAtoms = () => {
  useAtomsDebugValue()
  return <></>
}
