import { atomWithMachine } from 'jotai-xstate'
import { natsMachine } from '@jr200/xstate-nats'

// single atom using the nats machine
export const natsMachineAtom = atomWithMachine(() => natsMachine)
natsMachineAtom.debugLabel = 'js.natsMachineAtom'
