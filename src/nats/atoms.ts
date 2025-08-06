import { atomWithActor, atomWithActorSnapshot } from 'jotai-xstate'
import { natsMachine } from '@jr200/xstate-nats'
import { AnyActor } from 'xstate'

export const natsActorAtom = atomWithActor(natsMachine)

export const natsSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(natsActorAtom)
  return snapshot
})

export const natsSubjectSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(natsSnapshotAtom)
  const child = snapshot.children.subject
  return child as AnyActor
})

export const natsKvSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(natsSnapshotAtom)
  const child = snapshot.children.kv
  return child as AnyActor
})
