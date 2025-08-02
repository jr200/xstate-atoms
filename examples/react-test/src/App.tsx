import React from 'react'
import { Provider } from 'jotai'
import { DuckDbExample } from './components/DuckDbExample'

function App() {
  return (
    <Provider>
      <div className='App'>
        <h1>xstate-atoms Test App</h1>
        <p>Testing Jotai atoms for NATS, DuckDB, and Time utilities</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* <NatsExample /> */}
          <DuckDbExample />
        </div>
      </div>
    </Provider>
  )
}

export default App
