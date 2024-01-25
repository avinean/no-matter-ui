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
  sex: string
  birthday: Date
  source: string
  balance: number
  cardId: number
  image: string
  emails: Contact[]
  phones: Contact[]
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
}
