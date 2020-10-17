import { Reducer } from 'react';
import { MsgType, ResponseDataType } from '@/utils/constans';
import { Effect } from '@@/plugin-dva/connect';
import { fetchConversations, fetchFriendChatData } from '@/services/message';
import { message } from 'antd';
import { ConnectState } from '@/models/connect';

interface ConversationItem {
  nickname: string;
  friendId: string;
  content: string;
  avatar: string | null;
  unRead: number;
  type: MsgType;
  createDate: string;
}
export interface MessageModelState {
  conversations: Array<ConversationItem>;
  searchFriendsValue: string;
  currentFriendId: string;
  socket: WebSocket | null;
  chatListMap: Map<string, any>;
}
export interface MessageModelType {
  namespace: 'message';
  state: MessageModelState;
  effects: {
    fetchConversations: Effect;
    fetchFriendChatData: Effect;
  };
  reducers: {
    save: Reducer<MessageModelState, any>;
  };
}
const MessageModel: MessageModelType = {
  namespace: 'message',
  state: {
    //当前聊天的会话列表
    conversations: [
      // { nickname:"蜡笔小新", friendId:"sadfsdcsawdwdasaasd", content:"你好呀，👌", type:0, createDate:"2020/12/01",unRead:19,
      //   avatar:"https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=620507089,2445149939&fm=111&gp=0.jpg"},
      // { nickname:"工藤新一", friendId:"feadwdeaefefefefeff", content:"你好呀2，👌", type:1, createDate:"2020/12/02",unRead:3,
      //   avatar:"https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3438376110,1833847425&fm=26&gp=0.jpg"},
      // { nickname:"明智春光", friendId:"fevrfeasdwdwfefefea", content:"你好呀3，👌", type:2, createDate:"2020/12/03",unRead:0,
      //   avatar:"https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1942776689,7349846&fm=26&gp=0.jpg"},
      // { nickname:"不动游星", friendId:"thsfweawddwdwfefrea", content:"你好呀4，👌", type:3, createDate:"2020/12/04",unRead:99999,
      //   avatar:"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2539677796,3008160399&fm=26&gp=0.jpg"},
    ],
    //当前搜索想要和谁会话
    searchFriendsValue: '',
    //当前正在聊天的好友的id
    currentFriendId: '',
    //连接的socket
    socket: null,
    chatListMap: new Map(null),
  },
  effects: {
    /**
     * 获取用户的交流列表
     * @param _
     * @param call
     * @param put
     */
    *fetchConversations(_, { call, put }) {
      const result: ResponseDataType = yield call(fetchConversations);
      if (result.code == 200) {
        yield put({
          type: 'save',
          payload: {
            conversations: result.data,
          },
        });
      }
      if (result.code === 100) {
        message.error(result.message);
      }
    },
    *fetchFriendChatData({ payload }, { call, put, select }) {
      const response: ResponseDataType = yield call(
        fetchFriendChatData,
        payload,
      );
      if (response.code === 200) {
        //所有的聊天列表的map
        const chatListMap = yield select(
          (state: ConnectState) => state.message.chatListMap,
        );
        //将该好友的信息及聊天记录加入map
        chatListMap.set(response.data.id, response.data);
        yield put({
          type: 'save',
          payload: {
            chatListMap: chatListMap,
          },
        });
      } else if (response.code === 100) {
        message.error(response.message);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default MessageModel;
