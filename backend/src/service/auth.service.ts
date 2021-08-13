import axios from 'axios';
import { Session } from 'express-session';
import { githubConfig } from '../config';
import { INVALID_ACCESS } from '../constants/client-error-name';
import { User } from '../entity/User';
import { BadRequestError } from '../errors/client.error';
import { UserRepository } from '../repository/user.repository';
import removeBlank from '../utils/remove-blank';
import { URLSearchParams } from 'url';

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

async function getUserName({ userId }: { userId: number }) {
  const user = await UserRepository.findById({ id: userId });
  const name = user ? user.name : null;
  return name;
}

async function logout(session: Session) {
  if (session) {
    session.destroy(() => {});
    // TODO: session Datatype은 어떻게 정의하는지 찾아봐야함..

    // const { userId } = session;
    // if (userId) {
    //   const user = await UserRepository.findById({ id: +userId });
    //   if (!user) {
    //     throw new BadRequestError(INVALID_ACCESS);
    //   }
    //   user && session.destroy(() => {});
    // } else {
    //   throw new BadRequestError(INVALID_ACCESS);
    // }
  } else {
    throw new BadRequestError(INVALID_ACCESS);
  }
}

export const AuthService = {
  signInGithub,
  getUserName,
  logout,
};
