// hooks.ts
import { useAtomValue } from 'jotai'
import { epochRoundedFamily, timeTzFamily } from './atoms'
import { TimeGranularity } from './types'
import { getLocalTimeZone } from './utils'

export function useEpoch(granularity?: TimeGranularity) {
  const epoch = useAtomValue(epochRoundedFamily(granularity))
  return epoch
}

export function useZonedTime(granularity?: TimeGranularity, timeZone: string = getLocalTimeZone()) {
  const zonedTime = useAtomValue(timeTzFamily(`${granularity}|${timeZone}`))
  return zonedTime
}
