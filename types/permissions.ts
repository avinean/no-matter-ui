export enum Action {
  GET = 'read',
  POST = 'add',
  PUT = 'edit',
  DELETE = 'delete',
}

export enum Resource {
  user = 'user',
  service = 'service',
  material = 'material',
  client = 'client',
  businessObject = 'business-object',
  business = 'business',
  booking = 'booking',
  profile = 'profile',
  role = 'role',
}

export type Permission = `${Resource}:${Action}`
