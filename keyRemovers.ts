const getObjectKeys = <Obj extends Object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[]
}

const makeKeyRemover = <Key extends PropertyKey>(keys: Key[]) => 
  <Obj extends Object>(obj: Obj): Omit<Obj, Key> => 
  getObjectKeys(obj).reduce((finalObj, currentKey) => keys.includes(currentKey as Key) ? finalObj : {...finalObj, [currentKey]: obj[currentKey]}, {} as Omit<Obj, Key>)

const myObject = {
  a: 'a',
  b: 'b',
  c: 'c'
}
const keyRemover = makeKeyRemover(['a', 'b'])
const handledObj = keyRemover(myObject) // expect to return {c: 'c'}
// handledObj.a // type error because key 'a' has been removed from the obj

// PROBLEM:
// This is now also fine
const _ = makeKeyRemover(['d'])(myObject)

// 
// - - - - SOLUTION - - - - 
// 
const makeBetterKeyRemover = <Obj extends Object>(obj: Obj) => (keys: (keyof Obj)[]) => {
  return getObjectKeys(obj).reduce((finalObj, currentKey) => keys.includes(currentKey) ? finalObj : {...finalObj, [currentKey]: obj[currentKey]}, {})
}
// This is valid
makeBetterKeyRemover(myObject)(['a', 'b'])
// This is not because 'd' is not a key of myObject
makeBetterKeyRemover(myObject)(['a', 'b', 'd'])

// 
// -------- More complex data structure --------
// 
const phones = {
  apple: {
    iphone7: 'iphone7',
    iphone8: 'iphone8',
    iphoneX: 'iphoneX'
  },
  samsung: {
    galaxyS7: 'galaxyS7',
    galaxyS8: 'galaxyS8'
  },
  huawei: {
    mate10: 'mate10',
    mate20: 'mate20'
  }
}

const americanRemover = makeKeyRemover(['apple'])
const nonAmericanPhones = americanRemover(phones) // expect to return {samsung: {...}, huawei: {...}}
console.log(nonAmericanPhones.samsung.galaxyS7)
// console.log(nonAmericanPhones.apple.iphone7) // type error because key 'apple' has been removed from the obj


makeBetterKeyRemover(phones)(['pixel', 'xiaomi']) // type error because 'pixel' and 'xiaomi' are not keys of phones

// 
// - - - - Without generic - - - -
// 
const _makeKeyRemover = (keys: string[]) => (obj: Object): Omit<Object, string> => 
  getObjectKeys(obj).reduce((finalObj, currentKey) => currentKey in keys ? finalObj : {...finalObj, key: obj[currentKey]}, {})
const _keyRemover = _makeKeyRemover(['a', 'b'])
// this is valid but TS treats 'a' as a string instead of a key of myObject
_keyRemover(myObject).a 



// convert this to a module to get rid of redeclaration of getObjectKeys function
export {}