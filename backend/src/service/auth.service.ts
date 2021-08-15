import axios from 'axios';
import { Session } from 'express-session';
import { githubConfig } from '../config';
import { INVALID_ACCESS } from '../constants/client-error-name';
import { User } from '../entity/User';
import { BadRequestError } from '../errors/client.error';
import { UserRepository } from '../repository/user.repository';
import removeBlank from '../utils/remove-blank';
import { URLSearchParams } from 'url';

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

  user = await UserRepository.findByGitHubId(id);

  if (!user) {
    user = await UserRepository.create(id, removeBlank(name));
  }

  return user.id;
}

async function getUserName(userId: number): Promise<string | null> {
  const user = await UserRepository.findById(userId);
  const name = user ? user.name : null;
  return name;
}

async function logout(session: Session): Promise<void> {
  if (session) {
    session.destroy(() => {});
  } else {
    throw new BadRequestError(INVALID_ACCESS);
  }
}

async function validateForLogout(userId: SessionUserId): Promise<void> {
  if (userId) {
    const user = await UserRepository.findById(+userId);
    if (!user) {
      throw new BadRequestError(INVALID_ACCESS);
    }
  } else {
    throw new BadRequestError(INVALID_ACCESS);
  }
}

export const AuthService = {
  signInGithub,
  getUserName,
  logout,
  validateForLogout,
};
