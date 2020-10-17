//后台返回的restful Api的类型
export interface ResponseDataType {
  code: number;
  message: string;
  data: any;
}
//储存storage的类型
export enum StorageType {
  localStorage = 'LOCAL',
  sessionStorage = 'SESSION',
  both = 'BOTH',
  oneOf = 'ONE_OF',
}
//消息的类型
export enum MsgType {
  Message,
  Image,
  Video,
  File,
}
//用户的在线状态的类型
export enum UserStateType {
  Offline,
  Online,
}
//用户的在线状态的颜色
export const userStateColor = {
  [UserStateType.Offline]: 'red',
  [UserStateType.Online]: 'green',
};
//用户的在线状态的文本
export const userStateText = {
  [UserStateType.Offline]: '离线',
  [UserStateType.Online]: '在线',
};
//socket连接地址
export const SOCKET_ADDRESS = 'http://localhost:3000';
//socket返回的数据结构的类型
export interface SocketResponseType {
  actionType: string;
  response: ResponseDataType;
}
//socket将进行操作的类型
export enum SocketActionType {
  UpdateUserOnlineStatus = 'update-online-status', //更新在线状态
}
