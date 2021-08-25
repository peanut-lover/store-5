import { Goods } from '@src/types/Goods';

interface ReviewImg {
  id: number;
  url: string;
}

export interface Review {
  id: number;
  user: {
    id: number;
    name: string;
    profileImgUrl?: string | null;
  };
  goods?: Goods;
  rate: number;
  contents: string;
  reviewImgs: ReviewImg[];
  createdAt: string | Date;
  updatedAt: string | Date;
  isMine?: boolean;
}

export interface ReviewContent {
  images: ReviewImg[];
  rate: number;
  contents: string;
}
