// types.ts
export type TimeGranularity = 'millisecond' | 'second' | 'minute' | 'hour' | 'day'

export interface TimeConfig {
  offset: number
}
