import { getRepository } from 'typeorm';
import { USER_DB_ERROR } from '../constants/database-error-name';
import { User } from '../entity/User';
import { DatabaseError } from '../errors/base.error';

async function findByGitHubId({ githubId }: { githubId: string }) {
  try {
    const userRepo = getRepository(User);
    const data = await userRepo.findOne({
      where: { githubId },
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_DB_ERROR);
  }
}

async function findById({ id }: { id: number }) {
  try {
    const userRepo = getRepository(User);
    const data = await userRepo.findOne({
      where: { id },
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_DB_ERROR);
  }
}

async function create({ githubId, name }: { githubId: string; name: string }) {
  try {
    const userRepo = getRepository(User);
    const user = userRepo.create({ githubId, name });
    const result = await userRepo.insert(user);
    console.log(result);
    return user;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_DB_ERROR);
  }
}

export const UserRepository = {
  findByGitHubId,
  findById,
  create,
};
