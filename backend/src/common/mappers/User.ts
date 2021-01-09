import { User } from "../../data/entities/User";

export const fromUserToIAuthUser = (user: User) => {
    const { id } = user;
    return { id };
}