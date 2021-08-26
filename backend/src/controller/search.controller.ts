import { Response, Request } from 'express';
import { INVALID_DATA } from '../constants/client.error.name';
import { BadRequestError } from '../errors/client.error';
import { SearchService } from '../service/search.service';
async function getAutoSearchList(req: Request, res: Response) {
  const keyword = String(req.query.keyword);
  if (!keyword) throw new BadRequestError(INVALID_DATA);
  const result = await SearchService.getAutoSearchList(keyword);
  res.status(200).json({ result });
}

export const SearchController = {
  getAutoSearchList,
};
