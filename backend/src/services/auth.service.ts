import { getCustomRepository } from "typeorm";
import { ILoginProfile } from "../common/models/auth/IloginProfile";
import UserRepository from "../data/repositories/UserRepository";

export const getCreatedOrExistUser = async (profile: ILoginProfile) => {
    const { steamId } = profile;
    const userRepository = getCustomRepository(UserRepository)
    let user = await userRepository.findOne({ steamId });

    if (user) {
        if (user.displayName !== profile.displayName) {
            user = await userRepository.save({ ...user, displayName: profile.displayName })
        }
    } else {
        user = await userRepository.save(profile);
    }
    return user;
}