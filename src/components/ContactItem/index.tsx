import React, { FC } from 'react';
import { ContactItemBox } from '@/components/ContactItem/style';
import { Avatar, Badge } from 'antd';
import { MsgType } from '@/utils/constans';
import dayjs from 'dayjs';
interface IProps {
  nickname: string;
  date: string;
  content: string;
  avatar: string | null;
  unRead?: number;
  type: number;
  style?: React.CSSProperties;
  className?: string;
}

const ContactItem: FC<IProps> = ({
  className,
  unRead = 0,
  nickname,
  date,
  content,
  avatar,
  type,
  style,
}) => {
  const renderContent = () => {
    if (type === MsgType.Message) {
      return content;
    }
    if (type === MsgType.Video) {
      return '[视频]';
    }
    if (type === MsgType.Image) {
      return '[图片]';
    }
    if (type === MsgType.File) {
      return '[文件]';
    }
  };
  const formatDate = (dateString: string) => {
    const today = dayjs().format('YYYY/MM/DD');
    const toYear = dayjs().get('year');

    const itemDay = dayjs(dateString).format('YYYY/MM/DD');
    const itemYear = dayjs(dateString).get('year');
    if (today === itemDay) {
      //今天
      return dayjs(dateString).format('HH:mm');
    }
    if (toYear === itemYear) {
      //今年
      return dayjs(dateString).format('MM-DD');
    }
    return dayjs(dateString).format('YYYY/MM/DD');
  };

  return (
    <ContactItemBox className={className} style={style}>
      <div className={'avatar'}>
        <Badge count={unRead}>
          <Avatar src={avatar || undefined} size={50} shape={'square'}>
            {nickname}
          </Avatar>
        </Badge>
      </div>
      <div className={'detail'}>
        <div className={'nick-name'}>
          <div className={'name'}>{nickname}</div>
          <div className={'date'}>{formatDate(date)}</div>
        </div>
        <div className={'content'}>{renderContent()}</div>
      </div>
    </ContactItemBox>
  );
};
export default ContactItem;
