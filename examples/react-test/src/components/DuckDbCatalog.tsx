import React, { useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { prettyPrintDefault, getUserChildrenAtom, snapshotAtom, duckdbMachineAtom } from '@jr200/xstate-atoms'

export const DuckDbCatalog = () => {

  const [state, send] = useAtom(duckdbMachineAtom)
  const snapshot = useAtomValue(snapshotAtom)
  const getUserChildren = useAtomValue(getUserChildrenAtom)

  const [renderKey, setRenderKey] = useState(0)

  console.log({
    snapshot,
    getUserDirectSnapshot: snapshot.children.dbCatalog?.getSnapshot(),
    getUserChildren,
  })

  const handleRerender = () => {
    setRenderKey(prev => prev + 1)
  }
  

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='min-w-96 mx-auto'>
        <div className='grid grid-cols-1 gap-8'>
          {/* State Panel */}
          <div className='bg-white rounded-xl border border-gray-200 p-8 shadow-sm'>
            <div>
              <div className='flex items-center justify-between mb-6 gap-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-3 h-3 rounded-full bg-blue-500 animate-pulse' />
                  <h2 className='text-lg font-semibold text-gray-900'>DuckDB Catalog</h2>
                </div>
                <button
                  onClick={handleRerender}
                  className='px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                >
                  Rerender
                </button>
              </div>
            </div>

            <hr className='my-6 border-gray-200' />

            <div className='bg-gray-50 border border-gray-200 rounded-md p-4 overflow-auto max-h-96'>
              <pre className='text-xs'>{prettyPrintDefault(getUserChildren)}</pre>
            </div>
            <div className='text-xs text-gray-500 text-center mt-4'>
              Last render: {new Date().toLocaleTimeString()} (key: {renderKey})
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
