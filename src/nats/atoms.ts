import { atomWithMachine } from 'jotai-xstate'
import { natsMachine } from '@jr200/xstate-nats'
import { atom } from 'jotai'

// single atom using the nats machine
export const natsMachineAtom = atomWithMachine(() => natsMachine as any)
natsMachineAtom.debugLabel = 'js.natsMachineAtom'

export const natsConnectionHandleAtom = atom(get => get(natsMachineAtom).context.connection)
natsConnectionHandleAtom.debugLabel = 'js.natsConnectionHandleAtom'

export const natsSubjectMachineAtom = atom(get => get(natsMachineAtom).children.subject)
natsSubjectMachineAtom.debugLabel = 'js.natsSubjectMachineAtom'

export const natsKvMachineAtom = atom(get => get(natsMachineAtom).children.kv)
natsKvMachineAtom.debugLabel = 'js.natsKvMachineAtom'
