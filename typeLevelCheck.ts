type PrimitiveArgs<Args> = Args extends any[]
  ? "Argument cannot be an array"
  // Object
  : Args extends Record<PropertyKey, any>
  ? "Argument cannot be an object"
  : Args

const deepEqualValue = <Args>(a: PrimitiveArgs<Args>, b: PrimitiveArgs<Args>): boolean => {
  return a === b
}

// Primitives are allowed
deepEqualValue(1, 1)
deepEqualValue('foo', 'bar')

// Array and object are not allowed
deepEqualValue(['foo', 'bar'], [])
deepEqualValue(1, {foo: 'bar'})

export {}