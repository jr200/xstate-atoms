import { atomWithMachine } from 'jotai-xstate'
import { duckdbMachine } from '@jr200/xstate-duckdb'

// single atom using the duckdb machine
export const duckdbMachineAtom = atomWithMachine(() => duckdbMachine)
duckdbMachineAtom.debugLabel = 'js.duckdbMachineAtom'
