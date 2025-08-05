// atoms.ts
import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { truncateTime, toZonedDateTime } from './utils'
import { TimeConfig, TimeGranularity } from './types'

// --- Config Atom ---
const _baseTimeConfigAtom = atom<TimeConfig>({
  offset: 0,
})
_baseTimeConfigAtom.debugLabel = 'js._baseTimeConfigAtom'

export const timeConfigAtom = atom(
  get => get(_baseTimeConfigAtom),
  (get, set, update: Partial<TimeConfig> | ((prev: TimeConfig) => TimeConfig)) => {
    const prev = get(_baseTimeConfigAtom)
    const next = typeof update === 'function' ? update(prev) : { ...prev, ...update }
    set(_baseTimeConfigAtom, next)
    set(_internalStorageAtom, undefined)
  }
)
timeConfigAtom.debugLabel = 'js.timeConfigAtom'

const _internalStorageAtom = atom<number | undefined>(undefined)
_internalStorageAtom.debugLabel = 'js._internalStorageAtom'

export const epochAtom = atom(
  get => {
    const { offset } = get(timeConfigAtom)
    const val = get(_internalStorageAtom)
    return val !== undefined ? val + offset : undefined
  },
  (_get, set, value: number) => {
    set(_internalStorageAtom, value)
  }
)
epochAtom.debugLabel = 'js.epochAtom'

// --- Atom Family: Per-Granularity Truncated Epoch ---
export const epochRoundedFamily = atomFamily((granularity?: TimeGranularity) =>
  atom(get => {
    const epoch = get(epochAtom)
    return truncateTime(epoch, granularity)
  })
)

export const timeTzFamily = atomFamily((key: string) =>
  atom(get => {
    const [granularity, timeZone] = key.split('|')
    const truncatedEpoch = get(epochRoundedFamily(granularity as TimeGranularity | undefined))
    return toZonedDateTime(truncatedEpoch, timeZone)
  })
)
