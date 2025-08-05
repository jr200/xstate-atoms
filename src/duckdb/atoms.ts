import { atomWithActor, atomWithActorSnapshot } from 'jotai-xstate'
import { duckdbMachine } from '@jr200/xstate-duckdb'
import { AnyActor } from 'xstate'


// export const duckdbMachineAtom = atomWithMachine(() => duckdbMachine)
// duckdbMachineAtom.debugLabel = 'js.duckdbMachineAtom'

// export const duckdbHandleAtom = atom(get => get(duckdbMachineAtom).context.duckDbHandle)
// duckdbHandleAtom.debugLabel = 'js.duckdbHandleAtom'

// export const duckdbCatalogAtom = atom(get => get(duckdbMachineAtom).children.dbCatalog)
// duckdbCatalogAtom.debugLabel = 'js.duckdbCatalogAtom'

// export const duckdbCatalogStateAtom = atom(
//   get => get(duckdbCatalogAtom)?.getSnapshot()
// )
// duckdbCatalogStateAtom.debugLabel = 'js.duckdbCatalogStateAtom'


// export const childActorAtom = atom(get => get(duckdbMachineAtom).children.dbCatalog ?? null)

// // Reactive snapshot of child
// export const childStateAtom = atomFromActorRef<DuckDbCatalogSnapshot>(childActorAtom)

// // Reactive access to specific context field
// export const someFieldAtom = atom(get => get(childStateAtom)?.context.loadedVersions)


export const duckdbMachineAtom = atomWithActor(duckdbMachine)
export const snapshotAtom = atomWithActorSnapshot((get) => get(duckdbMachineAtom));

/**
 * That's what I would like to do, access children snapshot
 * but you can't do this because `getUser` can be undefined
 * because you can invokate it only on some state so it doesn't
 * persist across all the state machine execution
 *
 * Also this generate a runtime error on console:
 *
 * TypeError: Cannot read properties of undefined (reading 'getSnapshot')
 */
export const getUserChildrenAtom = atomWithActorSnapshot(
    (get) => {
        const snapshot = get(snapshotAtom);
        return snapshot.children.dbCatalog as AnyActor;
    }
)