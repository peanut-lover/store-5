const calculateTotalPage = (count: number, limit: number): number => Math.floor(count / limit);
const calculateOffset = (page: number, limit: number): number => (page * limit > limit ? (page - 1) * limit : 0);

export const pagination = { calculateTotalPage, calculateOffset };