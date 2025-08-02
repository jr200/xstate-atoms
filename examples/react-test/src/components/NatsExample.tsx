import React from 'react'
import { useAtom } from 'jotai'
import { natsMachineAtom } from '@jr200/xstate-atoms'
import yaml from 'js-yaml'
import { format as prettyFormat } from 'pretty-format'
import configContent from '/natsmachine.yaml.txt?raw'

export const NatsExample = () => {
  const [state, send] = useAtom(natsMachineAtom)

  const configure = () => {
    try {
      const yamlConfig = yaml.load(configContent)
      send({
        type: 'CONFIGURE',
        config: yamlConfig as any,
      })
      send({ type: 'CONNECT' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900'>XState Atoms Example</h1>
          <p className='text-gray-600'>DuckDB Machine State Management with Jotai</p>
        </div>

        {/* Panel Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Control Panel */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-medium text-gray-900'>Controls</h2>
              <div className='flex items-center space-x-2'>
                <div
                  className={`w-2 h-2 rounded-full ${
                    state.matches('connected')
                      ? 'bg-green-500'
                      : state.matches('connecting')
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                />
                <span className='text-sm text-gray-600'>
                  {state.matches('connected')
                    ? 'Connected'
                    : state.matches('connecting')
                      ? 'Connecting'
                      : 'Disconnected'}
                </span>
              </div>
            </div>

            <button
              onClick={configure}
              className='w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
            >
              Configure & Connect
            </button>
          </div>

          {/* State Panel */}
          <div className='bg-white rounded-lg border border-gray-200 p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Current State</h3>

            <div className='bg-white border border-gray-300 rounded-md p-4 overflow-auto max-h-80'>
              <pre className='text-black text-sm font-mono leading-relaxed whitespace-pre-wrap'>
                {prettyFormat(state, {
                  highlight: true,
                  indent: 2,
                  maxDepth: 10,
                })}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>Built with XState, Jotai, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
