import { getRepository } from 'typeorm';
import { USER_DB_ERROR } from '../constants/database.error.name';
import { User } from '../entity/User';
import { DatabaseError } from '../errors/base.error';

// TODO: 적절한 반환할 데이터 고민 후에 타입을 지정, 인자로 입력받는 것도 타입을 지정해서 사용하는 것으로
async function getByGitHubId(githubId: string): Promise<User | undefined> {
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

async function getById(id: number): Promise<User | undefined> {
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

async function create(githubId: string, name: string, profileImgUrl?: string): Promise<User> {
  try {
    const userRepo = getRepository(User);
    const user = await userRepo.save({ githubId, name, profileImgUrl });
    return user;
  } catch (err) {
    console.error(err);
    throw new DatabaseError(USER_DB_ERROR);
  }
}

export const UserRepository = {
  getByGitHubId,
  getById,
  create,
};
