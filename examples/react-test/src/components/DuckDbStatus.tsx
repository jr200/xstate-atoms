import React from 'react'
import { useAtomValue } from 'jotai'
import { callbackTextAtom } from './atoms'

export const DuckDbStatus = () => {
  const callbackText = useAtomValue(callbackTextAtom)

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='w-96 mx-auto'>
        <div className='grid grid-cols-1 gap-8'>
          {/* State Panel */}
          <div className='bg-white rounded-xl border border-gray-200 p-8 shadow-sm'>
            <div>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-3 h-3 rounded-full bg-blue-500' />
                  <h2 className='text-lg font-semibold text-gray-900'>DuckDB Notifications</h2>
                </div>
              </div>
            </div>

            <hr className='my-6 border-gray-200' />

            <div className='bg-gray-50 border border-gray-200 rounded-md p-4'>
              <p className='text-sm text-gray-700'>{callbackText}</p>
            </div>
            <div className='text-xs text-gray-500 text-center mt-4'>Last render: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
