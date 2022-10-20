type PhoneBrand = 'apple' | 'samsung' | 'google'
type Apple = Extract<PhoneBrand, 'apple'>
// type Apple = Extract<PhoneBrand, 'FOO'> // <- never

type StringOrNumber = string | number
const mix: StringOrNumber = true ? 12 : '12'
const pureString: Extract<StringOrNumber, string> = 'string'
const pureNumber: Extract<StringOrNumber, number> = 12

type EventT = {type: 'LOGIN', payload: {username: string, password: string}} | {type: 'LOGOUT'}
type LoginType = Extract<EventT, {type: 'LOGIN'}>
type LogoutType = Extract<EventT, {type: 'LOGOUT'}>

type Dynamic<T extends EventT['type']> = 
  Extract<EventT, {type: T}> extends {payload: infer PayloadT} 
  ? {type: T, payload: PayloadT}
  : {type: T}

type DLoginType = Dynamic<'LOGIN'>
type DLogoutType = Dynamic<'LOGOUT'>