// Each payment method needs specific payload
type PaymentCardPayload = {paymentMethod: 'card', payload: {shippingCountry: string}}
type PaymentPayPalPayload = {paymentMethod: 'paypal', payload: {postalCode: string}}
type PaymentPayload = PaymentCardPayload | PaymentPayPalPayload
const handlePayment = <T extends PaymentPayload['paymentMethod']>(
  ...args: Extract<PaymentPayload, {paymentMethod: T}> extends {payload: infer Payload}
  ? [paymentMethod: T, payload: Payload]
  : [paymentMethod: T]
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

  switch(args[0]) {
    case 'card':
      assertCardPayload(args[1])
      return handleCardPayment(args[1])
    case 'paypal':
      // Need similar type assertion here
      return handlePayPalPayment({postalCode: '00100'})
    default:
      throw new Error('not supported payment method')
  }
}


type PaymentMethodType = LooseAutocomplete<'card' | 'paypal'>
type Order = {
  paymentMethod: PaymentMethodType
  shippingCountry: string
  postalCode: string
}
const handleOrder = (order: Order) => {
  // Do something with the order

  // Handle payment
  switch(order.paymentMethod) {
    case 'card':
      return handlePayment('card', {shippingCountry: order.shippingCountry})
    case 'paypal':
      return handlePayment('paypal', {postalCode: order.postalCode})
    default:
      throw new Error('not supported payment method')
  }
}

handleOrder({
  paymentMethod: 'card',
  shippingCountry: 'FI',
  postalCode: '00100'
})