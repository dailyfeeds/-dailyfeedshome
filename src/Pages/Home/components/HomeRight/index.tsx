import { FC, useState, useRef } from 'react';
import { Comment, Avatar, Spin, Tooltip } from 'antd';
import moment from 'moment';
import './index.less';

type InitProps = {
  data: any;
  loading: boolean;
};

const BuyRight: FC<InitProps> = ({ data, loading }) => {

  const contentContainer = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} className='contentHtml' />
  }

  return (
    <div className='buyRightContainer'>
      <Spin spinning={loading}>
        {
          data.map((item: any) => {
            return (
              <Comment
                key={item.id}
                author={<span>{item.title}</span>}
                avatar={<Avatar src={item.author_info.avatar} alt="avatar" />}
                content={contentContainer(item.body.snippet)}
                datetime={
                  <Tooltip title={moment((item.create_time) * 1000).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment((item.create_time) * 1000).fromNow()}</span>
                  </Tooltip>
                }
              />
            )
          })
        }
      </Spin>
    </div>
  )
};

export default BuyRight