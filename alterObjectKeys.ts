interface ApiData {
  'maps:longitude': string
  'maps:latitude': string
}

// Type extension to remove "maps" prefix from keys
type RemoveMap<T> = T extends `maps:${infer U}` ? U : T

// Remap keys in original type by removing "maps" prefix
type RemoveMapsFromObj<T> = {
  [K in keyof T as RemoveMap<K>]: T[K]
}

type Data = RemoveMapsFromObj<ApiData> // {longitude: string, latitude: string}
