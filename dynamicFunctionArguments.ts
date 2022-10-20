// Each payment method needs specific payload
type PaymentCardPayload = {paymentMethod: 'card', payload: {shippingCountry: string}}
type PaymentPayPalPayload = {paymentMethod: 'paypal', payload: {postalCode: string}}
type PaymentMobilePayPayload = {paymentMethod: 'mobilepay', payload: {phoneNumber: string}}
type PaymentPayload = PaymentCardPayload | PaymentPayPalPayload | PaymentMobilePayPayload
const handlePayment = <T extends PaymentPayload['paymentMethod']>(
  args: Extract<PaymentPayload, {paymentMethod: T}> extends {payload: infer Payload}
  ? {paymentMethod: T, payload: Payload}
  // Always require payload object
  : never
  // Can do this to allow omit payload object
  // : {paymentMethod: T}
) => {
  const handleCardPayment = (cardPayload: PaymentCardPayload['payload']) => {
    console.log('handle card payment', cardPayload)
  }
  const handlePayPalPayment = (paypalPayload: PaymentPayPalPayload['payload']) => {
    console.log('handle PayPal payment', paypalPayload)
  }

  type AssertCardPayloadFn = (payload: unknown) => asserts payload is PaymentCardPayload['payload']
  const assertCardPayload: AssertCardPayloadFn = (payload: unknown) => {
    if(payload instanceof Object === false || payload?.hasOwnProperty('shippingCountry') === false) {
      throw new Error('invalid card payload')
    }
  }

  switch(args.paymentMethod) {
    case 'card':
      assertCardPayload(args.payload)
      return handleCardPayment(args.payload)
    case 'paypal':
      // Need similar type assertion here
      return handlePayPalPayment({postalCode: '00100'})
    default:
      throw new Error('not supported payment method')
  }
}


type PaymentMethodType = LooseAutocomplete<PaymentPayload['paymentMethod']>
type Order = {
  paymentMethod: PaymentMethodType
  shippingCountry: string
  postalCode: string
  phoneNumber: string
}
const handleOrder = (order: Order) => {
  // Do something with the order

  // Handle payment
  switch(order.paymentMethod) {
    case 'card':
      return handlePayment({paymentMethod: 'card', payload: {shippingCountry: order.shippingCountry}})
    case 'paypal':
      return handlePayment({paymentMethod: 'paypal', payload: {postalCode: order.postalCode}})
    case 'mobilepay':
      return handlePayment({paymentMethod: 'mobilepay', payload: {phoneNumber: order.phoneNumber}})
    default:
      throw new Error('not supported payment method')
  }
}

handleOrder({
  paymentMethod: 'card',
  shippingCountry: 'FI',
  postalCode: '00100',
  phoneNumber: '03030303030'
})