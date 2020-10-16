export interface ResponseDataType {
  code: number;
  message: string;
  data: any;
}
export enum StorageType {
  localStorage = 'LOCAL',
  sessionStorage = 'SESSION',
  both = 'BOTH',
  oneOf = 'ONE_OF',
}
export enum MsgType {
  Message,
  Image,
  Video,
  File,
}
