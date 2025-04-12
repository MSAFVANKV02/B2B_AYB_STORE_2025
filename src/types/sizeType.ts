export interface IBundleSize {
    _id: string
    name: string
    bundle: Bundle[]
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Bundle {
    size: string
    quantity: number
    _id: string
  }
  