import { getCustomRepository } from 'typeorm';
import { ErrorCode } from '../common/enums/ErrorCode';
import CustomError from '../common/errors/CustomError';
import { decrypt, encrypt } from '../common/helpers/encryptHelper';
import { createToken } from '../common/helpers/tokenHelper';
import { fromUserToIAuthUser } from '../common/mappers/User';
import { ILoginProfile } from '../common/models/auth/ILoginProfile';
import { IAuthUser } from '../common/models/user/IAuthUser';
import { RefreshToken } from '../data/entities/RefreshToken';
import RefreshTokenRepository from '../data/repositories/RefreshTokenRepository';
import UserRepository from '../data/repositories/UserRepository';

export const getCreatedOrExistUser = async (profile: ILoginProfile): Promise<IAuthUser> => {
  const { steamId } = profile;
  const userRepository = getCustomRepository(UserRepository);
  let user = await userRepository.findOne({ steamId });

  if (user) {
    if (user.displayName !== profile.displayName) {
      user = await userRepository.save({ ...user, displayName: profile.displayName });
    }
  } else {
    user = await userRepository.save(profile);
  }
  return fromUserToIAuthUser(user);
};

const createRefreshTokenData = async (id: string) => {
  const now = new Date();
  const after14days = now.setDate(now.getDate() + 14);
  const user = await getCustomRepository(UserRepository).findOne({ id });

  return {
    user,
    expiresAt: after14days
  };
};

const createRefreshToken = async (userId: string): Promise<RefreshToken> => {
  const refreshTokenData = await createRefreshTokenData(userId);
  const refreshToken = await getCustomRepository(RefreshTokenRepository).addToken(refreshTokenData);

  return refreshToken;
};

export const login = async (loginUser: IAuthUser) => {
  const { id } = await createRefreshToken(loginUser.id);
  return {
    accessToken: createToken(loginUser),
    refreshToken: encrypt(id)
  };
};

export const refreshTokens = async (encryptedId: string) => {
  const id = decrypt(encryptedId);
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);

  const refreshToken = await refreshTokenRepository.getById(id);

  if (!refreshToken) {
    throw new CustomError(401, 'Invalid refresh token', ErrorCode.InvalidRefreshToken);
  }

  if (Date.now() > refreshToken.expiresAt) {
    await refreshTokenRepository.deleteToken(id);
    throw new CustomError(401, 'Refresh token expired', ErrorCode.InvalidRefreshToken);
  }

  const newRefreshToken = await createRefreshToken(refreshToken.userId);

  await refreshTokenRepository.deleteToken(id);

  return {
    accessToken: createToken({ id: newRefreshToken.userId }),
    refreshToken: encrypt(newRefreshToken.id)
  };
};
