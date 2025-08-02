import React from 'react'
import { Provider } from 'jotai'
import { DuckDbExample } from './components/DuckDbExample'
import { NatsExample } from './components/NatsExample'
import { CombinedExample } from './components/CombinedExample'

function App() {
  return (
    <Provider>
      <div className='App'>
        <div className="flex flex-row gap-4">
          <NatsExample />
          <DuckDbExample />
          <CombinedExample />
        </div>
      </div>
    </Provider>
  )
}

export default App
