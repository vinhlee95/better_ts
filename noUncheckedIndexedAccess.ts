const data: Record<string, string[]> = {}
// data.foo.push('bar') // Error because noUncheckedIndexedAccess is enabled in tsconfig
if(data.foo) {
  data.foo.push('bar')
} else {
  data.foo = []
  data.foo.push('bar')
}
