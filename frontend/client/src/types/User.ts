export interface User {
  id: number;
  createdAt: string;
  isLoggedIn: boolean;
  name: string;
  profileImgUrl: string | null;
}
