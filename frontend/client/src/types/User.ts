export interface User {
  id: number;
  createdAt: string | Date;
  isLoggedIn: boolean;
  name: string;
  profileImgUrl: string | null;
}
