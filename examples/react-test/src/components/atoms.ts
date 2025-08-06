import { atom } from 'jotai'
import { InstantiationProgress } from '@duckdb/duckdb-wasm'
import { duckdbCatalogSnapshotAtom } from '@jr200/xstate-atoms'

export const renderKeyAtom = atom(0)
export const callbackTextAtom = atom<string>(
  'Click the button above to load a test table into DuckDB with the provided payload.'
)
export const initProgressAtom = atom<InstantiationProgress | null>(null)

// some states that we want to watch in the XState machine contexts
export const tableDefinitionsAtom = atom(get => get(duckdbCatalogSnapshotAtom).context.tableDefinitions)
export const loadedVersionsAtom = atom(get => get(duckdbCatalogSnapshotAtom).context.loadedVersions)
