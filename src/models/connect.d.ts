import { UserModelState } from './user';
import { MessageModelState } from '@/models/message';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    DataFactoryModelState?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  user: UserModelState;
  message: MessageModelState;
}
export { UserModelState };
