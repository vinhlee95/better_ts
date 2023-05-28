type SomeObject = {
  a: string;
  b: number;
}

/**
 * | {
 *   key: 'a';
 * }
 * | {
 *   key: 'b';
 * }
 */
type UnionKey = {
  [K in keyof SomeObject]: {
    key: K;
  }
}[keyof SomeObject];


type Fruit = "apple" | "banana" | "orange";

/**
 * | {
 *   thisFruit: 'apple';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'banana';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'orange';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 */
type FruitInfo = {
  [K in Fruit]: {
    thisFruit: K
    allFruit: Fruit
    restOfTheFruit: Exclude<Fruit, K>
  }
}[Fruit]

type PaymentProvider = "adyen" | "paypal"
// Create a new type, having:
// - paymentProvider of type Payment Provider
// - payload object, having encryptedNonce as a key
// Now this type can be pattern-matched via paymentProvider key
type PaymentPayload = {
  [Provider in PaymentProvider]: {
    paymentProvider: Provider
    payload: {
      encryptedNonce: string
    }
  }
}[PaymentProvider]

// HTTP response code
type SuccessResponseCode = 200 | 201
type FailureResponseCode = 400 | 500
type HttpResponseCode = SuccessResponseCode | FailureResponseCode

/**
 * | {
 *   code: 200;
 *   body: {
 *     success: true;
 *   };
 * }
 * | {
 *   code: 400;
 *   body: {
 *     success: false;
 *     error: string;
 *   };
 * }
 * | {
 *   code: 500;
 *   body: {
 *     success: false;
 *     error: string;
 *   };
 * }
 */
type HttpResponse = {
  [Code in HttpResponseCode]: {
    code: Code
    body: Code extends SuccessResponseCode ? 
    {
      success: true
    } :
    {
      success: false
      error: Code
    }
  }
}[HttpResponseCode]