import { atomWithActor, atomWithActorSnapshot } from 'jotai-xstate'
import { natsMachine } from '@jr200/xstate-nats'
import { AnyActor } from 'xstate'

// this pattern/workaround for accessing child states is from:
// https://github.com/jotaijs/jotai-xstate/issues/11
export const natsActorAtom = atomWithActor(natsMachine)
natsActorAtom.debugLabel = 'xa.natsActorAtom'

export const natsSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(natsActorAtom)
  return snapshot
})
natsSnapshotAtom.debugLabel = 'xa.natsSnapshotAtom'

export const natsSubjectSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(natsSnapshotAtom)
  const child = snapshot.children.subject
  return child as AnyActor
})
natsSubjectSnapshotAtom.debugLabel = 'xa.natsSubjectSnapshotAtom'

export const natsKvSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(natsSnapshotAtom)
  const child = snapshot.children.kv
  return child as AnyActor
})
natsKvSnapshotAtom.debugLabel = 'xa.natsKvSnapshotAtom'