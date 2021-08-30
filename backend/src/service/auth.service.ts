import axios from 'axios';
import { Session } from 'express-session';
import { githubConfig } from '../config';
import { INVALID_ACCESS } from '../constants/client.error.name';
import { BadRequestError } from '../errors/client.error';
import { UserRepository } from '../repository/user.repository';
import removeBlank from '../utils/remove.blank';
import { URLSearchParams } from 'url';

type SessionUserId = number | undefined | null;

async function signInGithub(code: string): Promise<number> {
  let user;
  const TOKEN_URL = `${githubConfig.tokenURL}&code=${code}`;
  const { data } = await axios.post(TOKEN_URL);
  const searchParams = new URLSearchParams(data);
  const accessToken = searchParams.get('access_token');
  const {
    data: { id, login: name, avatar_url: profileImgUrl },
  } = await axios.get(githubConfig.profileURL as string, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  user = await UserRepository.getByGitHubId(id);

  if (!user) {
    user = await UserRepository.create(id, removeBlank(name), profileImgUrl);
  }

  return user.id;
}

async function getUserNameAndProfileImgUrlById(
  userId: number
): Promise<{ name: string; profileImgUrl: string; id: number; createdAt: string | Date } | null> {
  const user = await UserRepository.getById(userId);
  if (!user) return null;
  const { name, profileImgUrl, id, createdAt } = user;
  return { name, profileImgUrl, id, createdAt };
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
    const user = await UserRepository.getById(+userId);
    if (!user) {
      throw new BadRequestError(INVALID_ACCESS);
    }
  } else {
    throw new BadRequestError(INVALID_ACCESS);
  }
}

export const AuthService = {
  signInGithub,
  getUserNameAndProfileImgUrlById,
  logout,
  validateForLogout,
};
