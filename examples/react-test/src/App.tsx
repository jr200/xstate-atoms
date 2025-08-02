import React from 'react'
import JotaiProvider from './providers/JotaiProvider'
import { DuckDbExample } from './components/DuckDbExample'
import { NatsExample } from './components/NatsExample'
import { TemporalExample } from './components/TemporalExample'
import { TemporalUpdater } from './components/TemporalUpdater'
import { TemporalGranularityExample } from './components/TemporalGranularityExample'

function App() {
  return (
    <div className='App'>
      <div className='flex flex-row gap-4'>
        <JotaiProvider>
          <TemporalUpdater />
          <NatsExample />
          <DuckDbExample />
          <TemporalExample />
          <TemporalGranularityExample granularity='minute' />
        </JotaiProvider>
      </div>
    </div>
  )
}

export default App
