import React from 'react'
import { useAtom } from 'jotai'
import { duckdbMachineAtom } from '@jr200/xstate-atoms'
import payloadContent from '/payload.b64ipc_zlib.txt?raw'

export const DuckDbUpdater = () => {
  const [, duckdbSend] = useAtom(duckdbMachineAtom)

  const handleUpdate = () => {
    duckdbSend({
      type: 'CATALOG.LOAD_TABLE',
      data: {
        tableSpecName: 'test_table',
        tablePayload: payloadContent,
        payloadType: 'b64ipc',
        payloadCompression: 'zlib',
        callback: (tableInstanceName: string, error?: string) => {
          console.log('duckdb updater callback', tableInstanceName, error)
        },
      },
    })
  }

  return (
    <>
      <button onClick={handleUpdate}>Load Table</button>
    </>
  )
}
