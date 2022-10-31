enum phoneModelEnum {
  iPhone8 = 'iPhone8',
  iPhoneX = 'iPhoneX',
  samsungGalaxyS8 = 'samsungGalaxyS8',
  samsungGalaxyS9 = 'samsungGalaxyS9'
}

// We can also declare literal type for each model like this:
// type allPhoneModels = {
//   iPhone8: 'iPhone8',
//   iPhoneX: 'iPhoneX',
//   samsungGalaxyS8: 'samsungGalaxyS8',
//   samsungGalaxyS9: 'samsungGalaxyS9'
// }

// Problem: we have to hard-code the literal values
// so if the values in allPhones change, we have to change the type here manually
// Also, if we added a new phone model, we have to add it here manually
type iPhoneModelUnion = phoneModelEnum.iPhone8 | phoneModelEnum.iPhoneX

// 
// Solution: extract keys from enum starting with 'iPhone'
// 
// 1. [K in Extract<keyof Obj, `iPhone${string}`>]: Obj[K]
//  - Form an object type, called it FormedObj, with keys that start with 'iPhone'
// 
// 2. FormedObj[Extract<keyof Obj, `iPhone${string}`>]
//  - Form a union type with values of the keys that start with 'iPhone'
// 
type iPhoneUnionGeneric<Obj> = {
  [K in Extract<keyof Obj, `iPhone${string}`>]: Obj[K]
}[Extract<keyof Obj, `iPhone${string}`>]


type BetteriPhoneModelUnion = iPhoneUnionGeneric<typeof phoneModelEnum> // 'iPhone8' | 'iPhoneX'


// 
// Next step: using default generic
// Benefits: DRY
// 
type iPhoneUnionGeneric2<
  Obj, 
  IPhoneModelKeys extends keyof Obj = Extract<keyof Obj, `iPhone${string}`>
> = {
  [K in IPhoneModelKeys]: Obj[K]
}[IPhoneModelKeys]

type BetteriPhoneModelUnionWithDefaultGeneric = iPhoneUnionGeneric2<typeof phoneModelEnum> // 'iPhone8' | 'iPhoneX'

