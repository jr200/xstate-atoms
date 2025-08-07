import { atom, WritableAtom } from 'jotai'
import { duckdbActorAtom } from './atoms'
import { QueryDbParams } from '@jr200/xstate-duckdb'

export const duckdbQueryAtom = atom(
  null,
  (
    get,
    set,
    query: {
      params: QueryDbParams,
      dataAtom: WritableAtom<any, [any], unknown>
    }
  ) => {
    const actor = get(duckdbActorAtom)
    if (!actor || !query.params.sql || !query.dataAtom) {
      return null
    }

    const description = `query-${query.params.description ?? 'unnamed'}`

    try {
      actor.send({
        type: 'QUERY.EXECUTE',
        queryParams: {
          ...query.params,
          description: description,
          callback: data => {
            set(query.dataAtom, data ?? [])
          }
        }
      })
    } catch (error) {
      console.error('Error sending query to DuckDB actor:', error)
      return null
    }
  }
)
