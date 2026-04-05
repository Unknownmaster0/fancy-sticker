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

// export default interface ProfileType {
//   user: UserDto;
// }

/*{
    "userDto": {
        "userId": 2,
        "name": "Unknown Master",
        "email": "sagar192004singh@gmail.com",
        "mobileNumber": "8521791969",
        "roles": null,
        "addressDto": {
            "street": "navratan hata purnea",
            "city": "Purnea",
            "state": "Bihar",
            "postalCode": "854301",
            "country": "IN"
        }
    },
    "emailUpdated": false
} */
