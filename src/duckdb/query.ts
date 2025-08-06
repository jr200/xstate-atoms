import { atom, WritableAtom } from 'jotai'
import { duckdbActorAtom } from './atoms'
import { arrayToObjectMap, arrayToObjectMultiMap, arrayToSimpleMap } from './utils'

export interface MapOptions {
  key: string
  value?: string
  type: 'dictionary' | 'multimap' | 'simplemap' | 'array'
}

export const duckdbQueryAtom = atom(
  null,
  (
    get,
    set,
    query: {
      sql: string
      dataAtom: WritableAtom<any, [any], unknown>
      mapOptions?: MapOptions
      description?: string
    }
  ) => {
    const actor = get(duckdbActorAtom)
    if (!actor || !query.sql || !query.dataAtom) {
      return null
    }

    const description = `query-${query.description ?? 'unnamed'}`

    try {
      actor.send({
        type: 'QUERY.EXECUTE',
        queryParams: {
          description: description,
          resultType: 'json',
          sql: query.sql,
          callback: data => {
            if (query.mapOptions) {
              let transformedData
              if (query.mapOptions.type === 'simplemap') {
                transformedData = arrayToSimpleMap(data, query.mapOptions.key, query.mapOptions.value!)
              } else if (query.mapOptions.type === 'multimap') {
                transformedData = arrayToObjectMultiMap(data, query.mapOptions.key)
              } else if (query.mapOptions.type === 'dictionary') {
                transformedData = arrayToObjectMap(data, query.mapOptions.key)
              } else {
                // (query.mapOptions.type === 'array')
                transformedData = data
              }
              set(query.dataAtom, transformedData)
            } else {
              set(query.dataAtom, data ?? [])
            }
          },
        },
      })
    } catch (error) {
      console.error('Error sending query to DuckDB actor:', error)
      return null
    }
  }
)
