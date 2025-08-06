import { atomWithActor, atomWithActorSnapshot } from 'jotai-xstate'
import { duckdbMachine } from '@jr200/xstate-duckdb'
import { AnyActor } from 'xstate'

// this pattern/workaround for accessing child states is from:
// https://github.com/jotaijs/jotai-xstate/issues/11
export const duckdbActorAtom = atomWithActor(duckdbMachine)
duckdbActorAtom.debugLabel = 'xa.duckdbActorAtom'

export const duckdbSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(duckdbActorAtom)
  return snapshot
})
duckdbSnapshotAtom.debugLabel = 'xa.duckdbSnapshotAtom'

export const duckdbCatalogSnapshotAtom = atomWithActorSnapshot(get => {
  const snapshot = get(duckdbSnapshotAtom)
  return snapshot.children.dbCatalog as AnyActor
})
duckdbCatalogSnapshotAtom.debugLabel = 'xa.duckdbCatalogSnapshotAtom'
