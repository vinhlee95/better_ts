/**
 * Multiple implementation of compose function
 * 
 */
// 1 argument as a function
function compose<Input, FirstFunction>(func: (input: Input) => FirstFunction): (input: Input) => FirstFunction

// Extend to 2 arguments
function compose<Input, FirstFunction, SecondFunction>(
  firstFunc: (input: Input) => FirstFunction,
  secondFunc: (input: FirstFunction) => SecondFunction
): (input: Input) => SecondFunction

// Curry function
function compose(...functions: any[]) {
  // Implementation could be anything, as long as it is a function receiving an input, e.g. simply:
  // return (input: any) => input
  return (input: any) => functions.reduce((val, currentFunc) => currentFunc(val), input)
}


const addOne = (input: number) => input += 1
const addTwo = (input: number) => input += 2
const sumOfTwo = (a: number, b: number) => a + b
const sumOfMany = (...list: number[]) => list.reduce((a, b) => a + b, 0)

const arrayToString = (input: string[]) => input.join('')
const stringToNumber = (input: string) => parseInt(input)


// console.log(compose(addOne, addTwo)(2)) // 5
// console.log(compose(arrayToString, stringToNumber)(['12', '23'])) // 1223

/**
 * Simpler implementation of compose
 * 
 */
function _compose<A extends ReadonlyArray<unknown>, B>(ab: (...a: A) => B): (...a: A) => B
function _compose<A extends ReadonlyArray<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: B) => C
): (...a: A) => C
function _compose<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...a: A) => D

function _compose(...functions: any[]) {
  // Implementation could be anything, as long as it is a function receiving an input, e.g. simply:
  // return (input: any) => input
  return (...input: any) => functions.reduce((currentVal, currentFunc) => Array.isArray(currentVal) ? currentFunc(...currentVal) : currentFunc(currentVal), input)
}

// console.log(_compose(addOne)(1))
// console.log(_compose(addOne, addTwo)(1))
// console.log(_compose(arrayToString, stringToNumber)(['12', '23']))
// console.log(_compose(sumOfTwo, addOne, addTwo)(1, 2))
// console.log(_compose(sumOfMany, addOne, addTwo)(1, 2, 3, 4, 5))


/**
 * Implementation of pipe
 * 
 */
function pipe<A>(
  a: A
): () => A

function pipe<A, B>(
  a: A,
  ab: (a: A) => B
): () => B

function pipe<A, B, C>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C
): () => C

function pipe(input: any, ...functions: Function[]) {
  return () => functions.reduce((val, currentFunc) => currentFunc(val), input)
}

// pipe(1)()

// pipe(
//   1,
//   addOne
// )()

// pipe(
//   1,
//   addOne,
//   addOne
// )()