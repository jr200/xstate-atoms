import React from 'react'
import JotaiProvider from './providers/JotaiProvider'
import { DuckDbExample } from './components/DuckDbExample'
import { NatsExample } from './components/NatsExample'
import { TemporalExample } from './components/TemporalExample'
import { TemporalUpdater } from './components/TemporalUpdater'
import { TemporalGranularityExample } from './components/TemporalGranularityExample'
import { DuckDbCatalog } from './components/DuckDbCatalog'
import { DuckDbUpdater } from './components/DuckDbUpdater'

function App() {
  return (
    <div className='App'>
      <div className='flex flex-row gap-4'>
        <JotaiProvider>
          <DuckDbUpdater />
          <TemporalUpdater />
          <DuckDbCatalog />
          <NatsExample />
          <DuckDbExample />
          <div className='flex flex-col gap-4 h-full'>
            <TemporalExample />
            <TemporalGranularityExample granularity='minute' />
          </div>
        </JotaiProvider>
      </div>
    </div>
  )
}

export default App
