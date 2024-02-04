export interface Entity {
  id: number
  createdAt: string
  updatedAt: string

}

export interface User extends Entity {
  firstName: string
  lastName: string
  sex: string
  birthday: Date
  image: string
  email: string
  phone: string
  roles: string
  services: ServiceProduct[]
  bussinesses?: Bussiness[]
}

export interface Bussiness extends Entity {
  name: string
  description: string
  image: string
  objects?: BussinessObject[]
}

export interface BussinessObject extends Entity {
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
  materialId: number
  quantity: number
  type: number
  description: string
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
  birthday: Date
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
