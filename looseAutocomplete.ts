type PaymentMethod = 'visa' | 'mastercard' | string

// By omitting string literals, we can have autocomplete for 'visa' & 'mastercard'
type LooseAutocompletePaymentMethodRaw = 'visa' | 'mastercard' | Omit<string, 'visa' | 'mastercard'>

// Make it generic
type LooseAutocomplete<T extends string> = T | Omit<string, T>
type PaymentMethodT = LooseAutocomplete<'visa' | 'mastercard'>

const makePayment = (paymentMethod: PaymentMethodT) => {
  switch(paymentMethod) {
    case 'visa':
      return 'visa_token'
    case 'mastercard':
      return 'mastercard_token'
    default:
      throw new Error('invalid payment method')
  }
}

