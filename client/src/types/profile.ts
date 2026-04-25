import type User from "./user";

export interface AddressType {
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

export default interface ProfileType extends User {
  addressDto: AddressType;
}
