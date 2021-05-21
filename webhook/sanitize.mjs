const sanitize = (data) =>
  typeof data === 'object'
    ? Array.isArray(data)
      ? data.map(sanitize)
      : Object.entries(data).reduce(
          (acc, [key, value]) =>
            key === 'sys' || key === 'metadata'
              ? acc
              : {
                  ...acc,
                  [key]: sanitize(value)
                },
          {}
        )
    : data

export default sanitize
