import { Reducer } from 'react';
import { MsgType, ResponseDataType } from '@/utils/constans';
import { Effect } from '@@/plugin-dva/connect';
import {
  fetchConversations,
  fetchFriendChatData,
  sendMessage,
  updateMessageReadStatus,
} from '@/services/message';
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
export interface ChatItem {
  content: string;
  content_type: number;
  create_time: string;
  creator_id: string;
  id: number;
  is_deleted: number;
  is_read: number;
  receive_id: string;
  update_time: string;
}
export interface FriendInfo {
  avatar: string;
  chatList: Array<ChatItem>;
  id: string;
  inputValue: string;
  nickname: string;
  onlineStatus: number;
  hasMore: boolean;
}
export interface MessageModelState {
  conversations: Array<ConversationItem>;
  searchFriendsValue: string;
  currentFriendId: string;
  socket: any | null;
  chatListMap: Map<string, FriendInfo>;
  inputValueMap: Map<string, string>;
  newMessage: ChatItem | null;
}
export interface MessageModelType {
  namespace: 'message';
  state: MessageModelState;
  effects: {
    fetchConversations: Effect;
    fetchFriendChatData: Effect;
    sendMessage: Effect;
    insideSocket: Effect;
    updateMessageReadStatus: Effect;
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
    //该用户所有的聊天的对象
    chatListMap: new Map(null),
    //用户输入的map
    inputValueMap: new Map(null),
    //用户接受到的新消息
    newMessage: null,
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
            currentFriendId:
              result.data.length > 0 ? result.data[0].friendId : '',
          },
        });
      }
      if (result.code === 100) {
        message.error(result.message);
      }
    },
    /**
     * 获取该好友的信息
     * @param payload
     * @param call
     * @param put
     * @param select
     */
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
        return [];
      }
      return response.data;
    },
    /**
     * 发送消息
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    *sendMessage({ payload }, { call, put, select }) {
      const response: ResponseDataType = yield call(sendMessage, payload);
      const conversations = yield select(
        (state: ConnectState) => state.message.conversations,
      );
      yield put({
        type: 'save',
        payload: {
          conversations: conversations.map((item: ConversationItem) => {
            if (response.data.receive_id === item.friendId) {
              return {
                ...item,
                createDate: response.data.create_time,
                type: response.data.content_type,
                content: response.data.content,
              };
            }
            return item;
          }),
        },
      });

      if (response.code === 200) {
        return 'success';
      }
      return 'failed';
    },
    /**
     * socket内部获取值
     * @param payload
     * @param _
     * @param select
     */
    *insideSocket(_, { select }) {
      return yield select((state: any) => state.message);
    },
    /**
     * 更新朋友的所有消息改成已读
     * @param payload
     * @param call
     * @param put
     * @param select
     */
    *updateMessageReadStatus({ payload }, { call, put, select }) {
      const result: ResponseDataType = yield call(
        updateMessageReadStatus,
        payload,
      );
      if (result.code === 200) {
        const conversations = yield select(
          (state: ConnectState) => state.message.conversations,
        );
        yield put({
          type: 'save',
          payload: {
            conversations: conversations.map((item: ConversationItem) => {
              if (payload.ids.indexOf(item.friendId) > -1) {
                return {
                  ...item,
                  unRead: 0,
                };
              }
              return item;
            }),
          },
        });
      }
      if (result.code === 100) {
        message.error(result.message);
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
