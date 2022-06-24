import { FC, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import showdown from 'showdown';
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

  const contentContainer = (content: string, id: string) => {
    let str = content.replace('![', '[').replace('**', '').replace('###', '').replace('##', '').replace('#', '').replace('\n\n', ' ').replace('\n', ' ')

    //截断最后一个空格内容
    let strIndex = str.lastIndexOf(' ');
    let finalValue = str.substring(0, strIndex + 1) + "...";
    let converter = new showdown.Converter()
    let html = converter.makeHtml(finalValue)
    return <div onClick={() => viewDetails(id)} dangerouslySetInnerHTML={{ __html: html }} className='contentHtml' />
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