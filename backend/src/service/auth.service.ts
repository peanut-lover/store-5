import axios from 'axios';
import { githubConfig } from '../config';
import { UserRepository } from '../repository/user.repository';
import removeBlank from '../utils/remove-blank';
import { URLSearchParams } from 'url';

async function signInGithub(code: string): Promise<string> {
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
    UserRepository.create({ githubId: `${id}`, name: removeBlank(name) });
  }
  return id;
}

export const AuthService = {
  signInGithub,
};
