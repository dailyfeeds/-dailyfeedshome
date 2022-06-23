import { FC, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment, Avatar, Spin, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';

type InitProps = {
  data: any;
  loading: boolean;
};

const UserHomeRight: FC<InitProps> = ({ data, loading }) => {
  const navigate = useNavigate();

  const contentContainer = (content: string, contentDigest: string) => {
    return <div onClick={() => viewDetails(contentDigest)} dangerouslySetInnerHTML={{ __html: content }} className='contentHtml' />
  }

  const viewDetails = (id: string) => {
    navigate(`/details/${id}`)
  }

  return (
    <div>
      <Spin spinning={loading}>
        <div className='userRightContainer'>
          {
            data?.posts?.map((item: any) => {
              return (
                <div key={item.contentDigest} className='userArticleContainer'>
                  <Comment
                    author={<span onClick={() => viewDetails(item.contentDigest)} className='authorSty'>{item.title}</span>}
                    avatar={data.avatarURL ? <Avatar src={data.avatarURL} alt="avatar" /> : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                    content={contentContainer(item.snipped, item.contentDigest)}
                    datetime={
                      <Tooltip title={moment(item.publishedAtTimestamp).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(item.publishedAtTimestamp).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </div>
              )
            })
          }
        </div>
      </Spin>
    </div>
  )
};

export default UserHomeRight