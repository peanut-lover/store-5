export interface Address {
  id: number;
  name: string;
  receiver: string;
  zipCode: string;
  address: string;
  subAddress: string;
  isDefault?: boolean;
}
