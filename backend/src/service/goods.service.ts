import { GoodsRepository } from '../repository/goods.repository';

async function getDetailById(id: number) {
  await GoodsRepository.findGoodsDetailById({ id });
}

export const GoodsService = {
  getDetailById,
};
