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
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='grid grid-cols-1 gap-8'>
          {/* State Panel */}
          <div className='bg-white rounded-xl border border-gray-200 p-8 shadow-sm'>
            <div>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      state.matches('connected')
                        ? 'bg-green-500'
                        : state.matches('connecting')
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                    }`}
                  />
                  <h2 className='text-lg font-semibold text-gray-900'>NATS</h2>
                </div>
                <button
                  onClick={configure}
                  className='px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                >
                  Load
                </button>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            <div className='bg-gray-50 border border-gray-200 rounded-md p-4 overflow-auto max-h-96'>
              <pre className='text-xs text-black text-sm font-mono leading-relaxed whitespace-pre-wrap'>
                {prettyFormat(state, {
                  highlight: true,
                  indent: 2,
                  maxDepth: 10,
                })}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
