import React from 'react'
import { Provider } from 'jotai'
// import TimeAtomTest from './components/TimeAtomTest'
// import DuckDbAtomTest from './components/DuckDbAtomTest'
// import NatsCoordinatedTest from './components/NatsCoordinatedTest'
import { MachineExample } from './components/MachineExample'

function App() {
  return (
    <Provider>
      <div className='App'>
        <h1>Jotai Stream Test App</h1>
        <p>Testing Jotai atoms for NATS, DuckDB, and Time utilities</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* <TimeAtomTest /> */}
          {/* <NatsCoordinatedTest /> */}
          <MachineExample />
          {/* <DuckDbAtomTest /> */}
        </div>
      </div>
    </Provider>
  )
}

export default App
