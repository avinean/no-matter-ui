export interface Entity {
  id: number
  createdAt: string
  updatedAt: string

}

export interface User extends Entity {
  email: string
}

export interface Material extends Entity {
  name: string
  description: string
  unit: string
  quantity: number
  criticalQuantity: number
}

export interface MaterialTransaction extends Entity {
  materialId: number
  quantity: number
  type: number
  description: string
}

export interface Contact extends Entity {
  type: 'email' | 'phone'
  value: string
}

export interface Profile extends Entity {
  firstName: string
  lastName: string
  phone: string
  sex: string
  birthday: Date
  source: string
  balance: number
  status: boolean
  cardId: number
  image: string
}

export interface ServiceProduct extends Entity {
  name: string
  description: string
  type: string
  price: number
  duration: number
  discount: number
  status: boolean
}
