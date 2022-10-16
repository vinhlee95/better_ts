type Car = 'audi' | 'bmw' | 'toyota' | 'nissan'

type RemoveToyota<T> = T extends 'toyota' ? never : T
type RemoveAsianBrand<T> = T extends 'toyota' | 'nissan' ? never : T

type CarWithoutToyota = RemoveToyota<Car>
type NonAsianCar = RemoveAsianBrand<Car>


type Status = 'init' | 'ok' | 'failed' | 'cancelled'
type NonFailure<T> = T extends 'failed' | 'cancelled' ? never : T

type SuccessStatus = NonFailure<Status>