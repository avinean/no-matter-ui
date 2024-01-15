export interface Entity {
  id: number,
  createdAt: string,
  updatedAt: string

}

export interface User extends Entity {
  username: string
  email: string,
}

export interface Material extends Entity {
  name: string;
  description: string;
  unit: string;
  criticalQuantity: number;
}

export interface MaterialTransaction extends Entity {
  materialId: number;
  quantity: number;
  type: number
}