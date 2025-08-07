// atoms.ts
import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { truncateTime, toZonedDateTime } from './utils'
import { TimeConfig, TimeGranularity } from './types'

// --- Config Atom ---
const baseTimeConfigAtom = atom<TimeConfig>({
  offset: 0,
})
baseTimeConfigAtom.debugLabel = 'xa.baseTimeConfigAtom'

export const timeConfigAtom = atom(
  get => get(baseTimeConfigAtom),
  (get, set, update: Partial<TimeConfig> | ((prev: TimeConfig) => TimeConfig)) => {
    const prev = get(baseTimeConfigAtom)
    const next = typeof update === 'function' ? update(prev) : { ...prev, ...update }
    set(baseTimeConfigAtom, next)
    set(internalStorageAtom, undefined)
  }
)
timeConfigAtom.debugLabel = 'xa.timeConfigAtom'

const internalStorageAtom = atom<number | undefined>(undefined)
internalStorageAtom.debugLabel = 'xa.internalStorageAtom'

export const epochAtom = atom(
  get => {
    const { offset } = get(timeConfigAtom)
    const val = get(internalStorageAtom)
    return val !== undefined ? val + offset : undefined
  },
  (_get, set, value: number) => {
    set(internalStorageAtom, value)
  }
)
epochAtom.debugLabel = 'xa.epochAtom'

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
