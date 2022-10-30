const phoneModel = {
  iPhone7: 'iPhone7',
  iPhone8: 'iPhone8',
  iPhone9: 'iPhone9'
}

const getObjectKeys = <Obj extends Object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[]
}

const calculateModelPrice = getObjectKeys(phoneModel).map(key => {
  // key now has union of literal type 'iPhone7' | 'iphone8' | 'iPhone9'
})
