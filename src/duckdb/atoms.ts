import { atomWithMachine } from 'jotai-xstate'
import { duckdbMachine } from '@jr200/xstate-duckdb'
import { atom } from 'jotai'

export const duckdbMachineAtom = atomWithMachine(() => duckdbMachine)
duckdbMachineAtom.debugLabel = 'js.duckdbMachineAtom'

export const duckdbHandleAtom = atom(get => get(duckdbMachineAtom).context.duckDbHandle)
duckdbHandleAtom.debugLabel = 'js.duckdbHandleAtom'

export const duckdbCatalogAtom = atom(get => get(duckdbMachineAtom).children.dbCatalog)
duckdbCatalogAtom.debugLabel = 'js.duckdbCatalogAtom'
