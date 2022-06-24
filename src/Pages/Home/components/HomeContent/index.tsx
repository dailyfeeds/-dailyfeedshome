import { FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment, Avatar, Spin, Tooltip } from 'antd';
import showdown from 'showdown'
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';

type InitProps = {
  data: any;
  loading: boolean;
  refreshArticleData: () => void
};

const HomeContent: FC<InitProps> = ({ data, loading, refreshArticleData }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (scrollRef && scrollRef.current) {
  //     scrollRef.current.addEventListener("scroll", (e: any) => {
  //       const { clientHeight, scrollHeight, scrollTop } = e.target;
  //       const isBottom = scrollTop + clientHeight === scrollHeight;
  //       if (isBottom) {
  //         refreshArticleData()
  //       }
  //     })
  //   }
  // }, [scrollRef, scrollRef.current])

  const contentContainer = (content: string, id: string) => {
    let str = content.replace('![', '[').replace('**', '').replace('#', '').replace('##', '').replace('###', '').replace('\n\n', ' ').replace('\n', ' ')

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
    <div className='homeContentContainer' ref={scrollRef}>
      <Spin spinning={loading}>
        {
          data.map((item: any) => {
            return (
              <div className='articleContainer' key={item.originalDigest}>
                <Comment
                  author={<span onClick={() => viewDetails(item.contentDigest)} className='authorSty'>{item.title}</span>}
                  avatar={<div onClick={() => { navigate(`/author/${item.address}`) }}>{item.avatarURL ? <Avatar src={item.avatarURL} alt="avatar" /> : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}</div>}
                  content={contentContainer(item.snipped, item.contentDigest)}
                  datetime={
                    <Tooltip title={moment((item.publishedAtTimestamp) * 1000).format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment((item.publishedAtTimestamp) * 1000).fromNow()}</span>
                    </Tooltip>
                  }
                />
              </div>
            )
          })
        }
      </Spin>
    </div>
  )
};

export default HomeContent