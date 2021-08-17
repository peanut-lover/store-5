export interface File {
  name: string;
  size: number;
  type: string;
  originalname: string;
  extension: string;
  content: ArrayBuffer;
}
