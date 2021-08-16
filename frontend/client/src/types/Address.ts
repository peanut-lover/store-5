export interface AddressCore {
  name: string;
  receiver: string;
  zipCode: string;
  address: string;
  subAddress: string;
  isDefault: boolean;
}

export type Address = AddressCore & {
  id: number;
};
