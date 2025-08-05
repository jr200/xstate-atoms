interface PrettyPrintOptions {
  omitKeys?: string[]
  omitTypes?: string[]
  showOmitDetail?: boolean
}

export const prettyPrintDefault = (
  value: any,
  omitKeys: string[] = [],
  omitTypes: string[] = [],
  showOmitDetail: boolean = false
) => {
  const defaultOmitKeys = [
    '.context.cachedKvm',
    '.context.connection',
    '.context.cachedConnection',
    '.context.duckDbHandle',
    '.machine',
    '.system',
    '.src',
    '.logic',
    '.options',
    '_.*',
    '.children',
    '.auth.sentinelB64',
    '.auth.user',
    '.auth.pass',
    '.auth.token',
    ...omitKeys,
  ]
  const defaultOmitTypes = ['SubscriptionImpl', ...omitTypes]
  return prettyPrint(value, { omitKeys: defaultOmitKeys, omitTypes: defaultOmitTypes, showOmitDetail })
}

export const prettyPrint = (value: any, opts: PrettyPrintOptions = {}) => {
  const { omitKeys = [], omitTypes = [], showOmitDetail = false } = opts
  const shouldOmitKey = (key: string, currentPath: string, omitKeys: string[]): boolean => {
    return omitKeys.some(pattern => {
      if (pattern.startsWith('.')) {
        const patternWithoutDot = pattern.slice(1)
        return currentPath === patternWithoutDot || currentPath.endsWith(pattern)
      }

      try {
        const regex = new RegExp(pattern)
        return regex.test(key) || regex.test(currentPath)
      } catch {
        return key === pattern
      }
    })
  }

  const shouldOmitType = (obj: any, omitTypes: string[]): string | false => {
    if (!obj || typeof obj !== 'object') return false

    if (obj.constructor && obj.constructor.name) {
      if (omitTypes.includes(obj.constructor.name)) {
        return obj.constructor.name
      }
    }

    return false
  }

  const convertMapsToObjects = (
    obj: any,
    visited = new WeakSet(),
    currentPath: string = '',
    showOmitDetail: boolean = false
  ): any => {
    if (typeof obj === 'function') {
      return showOmitDetail ? `[Function: ${obj.name || 'anonymous'}]` : `[Function]`
    }

    // Check if we should omit this type - do this BEFORE other checks
    const omittedType = shouldOmitType(obj, omitTypes)
    if (omittedType) {
      return showOmitDetail ? `[_Omit(${omittedType})]` : `[_Omit]`
    }

    if (obj instanceof Map) {
      const mapObj = Object.fromEntries(obj)
      const result: any = {}
      for (const [key, value] of Object.entries(mapObj)) {
        const keyPath = currentPath ? `${currentPath}.${key}` : key
        if (shouldOmitKey(key, keyPath, omitKeys)) {
          result[key] = showOmitDetail ? `[_Omit(${key})]` : `[_Omit]`
        } else {
          result[key] = convertMapsToObjects(value, visited, keyPath, showOmitDetail)
        }
      }
      return result
    }
    if (Array.isArray(obj)) {
      return obj.map((item, index) => {
        const itemPath = currentPath ? `${currentPath}[${index}]` : `[${index}]`
        return convertMapsToObjects(item, visited, itemPath, showOmitDetail)
      })
    }
    if (obj && typeof obj === 'object') {
      if (visited.has(obj)) {
        return '[CircularReference]'
      }

      visited.add(obj)
      const result: any = {}
      for (const [key, value] of Object.entries(obj)) {
        const keyPath = currentPath ? `${currentPath}.${key}` : key
        if (shouldOmitKey(key, keyPath, omitKeys)) {
          result[key] = showOmitDetail ? `[_Omit(${key})]` : `[_Omit]`
        } else {
          result[key] = convertMapsToObjects(value, visited, keyPath, showOmitDetail)
        }
      }
      return result
    }
    return obj
  }

  const convertedValue = convertMapsToObjects(value, new WeakSet(), '', showOmitDetail)

  return JSON.stringify(convertedValue, null, 2)
}
