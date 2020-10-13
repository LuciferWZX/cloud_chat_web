import { UserModelState } from './user';


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
}
export { UserModelState };
