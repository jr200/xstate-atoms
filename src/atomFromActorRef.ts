import { atom } from 'jotai'
import type { ActorRef, Snapshot } from 'xstate'

export function atomFromActorRef<TSnapshot extends Snapshot<any>>(
  actorAtom: any
) {
  const stateAtom = atom(
    (get) => {
      const actor = get(actorAtom) as ActorRef<TSnapshot, any> | null
      return actor?.getSnapshot() ?? null
    },
    (get, set, _update) => {
      const actor = get(actorAtom) as ActorRef<TSnapshot, any> | null
      if (!actor) return
      return actor.subscribe((snapshot: TSnapshot) => {
        set(stateAtom, () => snapshot)
      })
    }
  )

  return stateAtom
}
