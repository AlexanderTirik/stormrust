import { User } from "../../../data/entities/User";

export interface ICreateRefreshToken {
    user: User;
    expiresAt: number;
}