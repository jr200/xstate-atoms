// import { atomWithMachine } from 'jotai-xstate'
// import { atom } from 'jotai'
// import { natsMachine } from '@jr200/xstate-nats'

// // Single atom using the natsXsm machine
// export const natsMachineAtom = atomWithMachine(() => natsMachine) as any
// natsMachineAtom.debugLabel = 'js.natsMachineAtom'

// // Helper atom for easy access to common state
// export const natsStateAtom = atom(get => {
//   const state = get(natsMachineAtom) as any
//   return {
//     // Connection state
//     isConnected: state.context.isConnected,
//     isConfigured: state.context.isConfigured,
//     error: state.context.error,

//     // Current machine state
//     value: state.value,
//     context: state.context,
//   }
// })

// // Helper atom for actions with proper typing
// export const natsActionsAtom = atom(null, (_get, set, action: any) => {
//   set(natsMachineAtom, action)
// })
