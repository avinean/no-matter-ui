import type { Action, Resource } from './permissions'
import type { ConfirmationStatus, ContactType, MaterialTransactionType, ServiceType, Sex } from './enums'

export interface PermissionEntity {
  id: number
  actionType: Action
  resourceType: Resource
  roles: RoleEntity[]
}

export interface RoleEntity {
  id: number
  name: string
  assignedPermissions: PermissionEntity[]
  assignedProfiles: ProfileEntity[]
  business: BusinessEntity
  createdAt: Date | string
  updatedAt: Date | string
}

export interface UserEntity {
  id: number
  phone: string
  password: string
  createdAt: Date | string
  updatedAt: Date | string
  associatedProfiles: ProfileEntity[]
}

export interface ProfileEntity {
  id: number
  firstName: string
  lastName: string
  sex: Sex
  birthday: Date | string
  image: string
  email: string
  phone: string
  status: boolean
  createdAt: Date | string
  updatedAt: Date | string
  userId: number
  user: UserEntity
  roles: RoleEntity[]
  services: ServiceEntity[]
  bookings: BookingEntity[]
  ownedBusinesses: BusinessEntity[]
  ownedObjects: BusinessObjectEntity[]
  employers: BusinessObjectEntity[]
  initiatedMaterialTransactions: MaterialTransactionEntity[]
}

export interface BusinessEntity {
  id: number
  name: string
  description?: string
  image?: string
  createdAt: Date | string
  updatedAt: Date | string
  owner: ProfileEntity
  businessObjects: BusinessObjectEntity[]
  roles: RoleEntity[]
}

export interface BusinessObjectEntity {
  id: number
  name: string
  description?: string
  image?: string
  createdAt: Date | string
  updatedAt: Date | string
  createdBy: ProfileEntity
  business: BusinessEntity
  employees: ProfileEntity[]
  customers: ClientEntity[]
  materialTransactions: MaterialTransactionEntity[]
  materials: MaterialEntity[]
}

export interface MaterialEntity {
  id: number
  name: string
  description: string
  unit: string
  quantity: number
  criticalQuantity: number
  createdAt: Date | string
  updatedAt: Date | string
  transactions: MaterialTransactionEntity[]
  businessObject: BusinessObjectEntity
  spending: ServiceMaterialEntity[]
}

export interface MaterialTransactionEntity {
  id: number
  quantity: number
  description: string
  type: MaterialTransactionType
  createdAt: Date | string
  material: MaterialEntity
  initiator: ProfileEntity
  businessObject: BusinessObjectEntity
  reverted: MaterialTransactionEntity | null
  reverting: MaterialTransactionEntity | null
}

export interface ClientEntity {
  id: number
  firstName: string
  lastName: string
  sex: Sex
  birthday: Date | string
  source: string
  image?: string
  email?: string
  phone: string
  status: boolean
  balance: number
  discount: number
  createdAt: Date | string
  updatedAt: Date | string
  contacts: ContactEntity[]
  bookings: BookingEntity[]
  businessObjects: BusinessObjectEntity[]
}

export interface ContactEntity {
  id: number
  type: ContactType
  value: string
  verified: boolean
}

export interface EventEntity {
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
  service?: ServiceEntity[]
  specialist?: string
  timeSlots?: object
  createdAt: Date | string
  updatedAt: Date | string
}

export interface ServiceMaterialEntity {
  id?: number
  quantity: number
  service?: ServiceEntity
  material: MaterialEntity
}

export interface ServiceEntity {
  id: number
  name: string
  description: string
  type: ServiceType
  price: number
  duration: number
  discount: number
  status: boolean
  createdAt: Date | string
  updatedAt: Date | string
  profiles: ProfileEntity[]
  bookings: BookingEntity[]
  relatedBusinessObjects: BusinessObjectEntity[]
  orders: OrderEntity[]
  spending: ServiceMaterialEntity[]
}

export interface OrderEntity {
  id: number
  booking: BookingEntity
  products: ServiceEntity[]
}

export interface BookingEntity {
  id: number
  date: Date | string
  duration: number
  status: ConfirmationStatus
  comment: string
  createdAt: Date | string
  updatedAt: Date | string
  profile: ProfileEntity
  services: ServiceEntity[]
  client: ClientEntity
  order: OrderEntity
}

export interface LocaleEntity {
  locale: string
  label: string
  avatar: { src: string }
}
