const sanitize = (data) =>
  typeof data === 'object'
    ? Array.isArray(data)
      ? data.map(sanitize)
      : Object.entries(data)
          .filter(([key]) => key !== 'sys' && key !== 'metadata')
          .reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: sanitize(value)
            }),
            {}
          )
    : data

export default sanitize
