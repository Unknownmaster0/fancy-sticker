import type User from "./user";

export default interface ProfileType extends User {
    street: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
}