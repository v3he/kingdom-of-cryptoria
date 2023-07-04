export interface Attribute {
  trait_type: string
  value: number
}

export interface Metadata {
  name: string
  description: string
  image: string
  trace: string
  attributes: Attribute[]
}
