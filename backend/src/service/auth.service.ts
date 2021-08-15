import { AddressBody } from './../types/request/auth.request';
import axios from 'axios';
import { Session } from 'express-session';
import { githubConfig } from '../config';
import { INVALID_ACCESS } from '../constants/client-error-name';
import { User } from '../entity/User';
import { BadRequestError } from '../errors/client.error';
import { UserRepository } from '../repository/user.repository';
import removeBlank from '../utils/remove-blank';
import { URLSearchParams } from 'url';
import { UserAddressRepository } from '../repository/user.address.repository';

type SessionUserId = number | undefined | null;

async function signInGithub(code: string): Promise<number> {
  let user;
  const TOKEN_URL = `${githubConfig.tokenURL}&code=${code}`;
  const { data } = await axios.post(TOKEN_URL);
  const searchParams = new URLSearchParams(data);
  const accessToken = searchParams.get('access_token');
  const {
    data: { id, name },
  } = await axios.get(githubConfig.profileURL as string, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  user = await UserRepository.findByGitHubId({ githubId: id });

  if (!user) {
    user = (await UserRepository.create({ githubId: `${id}`, name: removeBlank(name) })) as User;
  }

  return user.id;
}

async function getUserName(userId: number) {
  const user = await UserRepository.findById({ id: userId });
  const name = user ? user.name : null;
  return name;
}

async function logout(session: Session) {
  if (session) {
    session.destroy(() => {});
  } else {
    throw new BadRequestError(INVALID_ACCESS);
  }
}

async function validateForLogout(userId: SessionUserId) {
  if (userId) {
    const user = await UserRepository.findById({ id: +userId });
    if (!user) {
      throw new BadRequestError(INVALID_ACCESS);
    }
  } else {
    throw new BadRequestError(INVALID_ACCESS);
  }
}

async function getAddresses(userId: number) {
  return await UserAddressRepository.getAddressesById(1);
}

async function createAddress(userId: number, body: AddressBody) {
  if (body.isDefault) {
    return await UserAddressRepository.createDefaultAddress(1, body);
  }
  return await UserAddressRepository.createAddress(1, body);
}

export const AuthService = {
  signInGithub,
  getUserName,
  logout,
  validateForLogout,
  getAddresses,
  createAddress,
};
