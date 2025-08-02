import React, { type ReactNode } from 'react'
import { createStore, Provider } from 'jotai'
import { DevTools, useAtomsDebugValue } from 'jotai-devtools'
import 'jotai-devtools/styles.css'


export const store = createStore()

type Props = {
  children: ReactNode
}

const JotaiProvider = ({ children }: Props) => (
  <Provider store={store}>
    {process.env.NODE_ENV === 'development' && <DebugAtoms />}
    <DevTools store={store} />
    {children}
  </Provider>
)

export default JotaiProvider

const DebugAtoms = () => {
  useAtomsDebugValue()
  return <></>
}
