import React from 'react'
import JotaiProvider from './providers/JotaiProvider'
import { DuckDbExample } from './components/DuckDbExample'
import { NatsExample } from './components/NatsExample'
import { TimeExample } from './components/TimeExample'

function App() {
  return (
    <div className='App'>
      <div className='flex flex-row gap-4'>
        <JotaiProvider>
          <NatsExample />
          <DuckDbExample />
          <TimeExample />
        </JotaiProvider>
      </div>
    </div>
  )
}

export default App
