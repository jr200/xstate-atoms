import React from 'react'
import { InstantiationProgress } from '@duckdb/duckdb-wasm'

export const ProgressBar = ({ progress }: { progress: InstantiationProgress }) => {
  const getProgressPercentage = () => {
    const blocks = Math.max(Math.min(Math.floor((progress.bytesLoaded / progress.bytesTotal) * 10.0), 10.0), 0.0)
    const percentage = Math.round((blocks / 10.0) * 100)

    return percentage
  }

  const percentage = getProgressPercentage()
  const stage = `${(progress.bytesLoaded / 1024 / 1024).toFixed(2)} mb loaded`

  return (
    <div className='flex items-center gap-3'>
      <div className='flex-1 bg-gray-200 rounded-full h-1.5'>
        <div
          className='bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out'
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className='text-xs text-gray-500 min-w-fit'>{stage}</span>
    </div>
  )
}
