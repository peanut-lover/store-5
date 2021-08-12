import { getRepository } from 'typeorm';
import { User } from '../entity/User';

const userRepo = getRepository(User);

async function findUserByGitHubId({ githubId }: { githubId: string }) {
  try {
    const data = await userRepo.findOne({
      where: { githubId },
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function findUserById({ id }: { id: number }) {
  const data = await userRepo.findOne({
    where: { id },
  });
  return data;
}

async function createUser({ githubId, name }: { githubId: string; name: string }) {
  const;
}
