import type { Action, Resource } from './permissions'

export interface Entity {
  id: number
  createdAt: string
  updatedAt: string
}

export interface Permission extends Entity {
  resource: Resource
  action: Action
}

export interface Role extends Entity {
  name: string
  permissions: Permission[]
}

export interface User extends Entity {
  firstName: string
  lastName: string
  sex: string
  birthday: Date
  image?: string
  email: string
  phone: string
  roles: Role[]
  services: ServiceProduct[]
  businesses?: Business[]
  employers: BusinessObject[]
}

export interface Business extends Entity {
  name: string
  description: string
  image: string
  objects?: BusinessObject[]
}

export interface BusinessObject extends Entity {
  name: string
  description: string
  image: string
}

export interface Material extends Entity {
  name: string
  description: string
  unit: string
  quantity: number
  criticalQuantity: number
}

export interface MaterialTransaction extends Entity {
  quantity: number
  description: string
  type: string
  material: Material
  initiator: User
  businessObject: BusinessObject
  revertingTransaction?: MaterialTransaction
  revertedTransaction?: MaterialTransaction
}

export interface Contact extends Entity {
  type: 'email' | 'phone'
  value: string
}

export interface Client extends Entity {
  firstName: string
  lastName: string
  phone: string
  sex: string
  birthday: string
  source: string
  balance: number
  status: boolean
  cardId: number
  image: string
}

export interface Event extends Entity {
  id: number
  price?: number
  title?: string
  description?: string
  phone?: string
  lastName: string
  firstName: string
  start?: Date | string
  end?: Date | string
  approved?: boolean
  beenPaid?: boolean
  allDay?: boolean
  service?: object[]
  specialist?: string
  timeSlots?: object
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

export interface Booking extends Entity {
  client: Client
  profile: User
  services: ServiceProduct[]
  date: Date
  status: boolean
  duration: number
}
