export const sanitize = (data: any, parentKey?: any): any =>
  typeof data === 'object'
    ? Array.isArray(data)
      ? data.map(sanitize)
      : Object.entries(data)
          .filter(([key]) => key !== 'sys' && key !== 'metadata')
          .reduce((acc, [key, value]) => {
            return {
              ...acc,
              ...(key === 'fields'
                ? sanitize(value, key)
                : key === 'file'
                ? { src: value.url }
                : key === 'src' && typeof value === 'object'
                ? sanitize(value, key)
                : { [key]: sanitize(value, key) })
            }
          }, {})
    : data
