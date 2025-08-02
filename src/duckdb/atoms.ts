import { atomWithMachine } from 'jotai-xstate'
import { duckdbMachine } from '@jr200/xstate-duckdb'

// Single atom using the natsXsm machine
export const duckdbMachineAtom = atomWithMachine(() => duckdbMachine)
duckdbMachineAtom.debugLabel = 'js.duckdbMachineAtom'
