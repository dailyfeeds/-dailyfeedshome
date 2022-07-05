import { FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment, Avatar, Spin, Tooltip, Button } from 'antd';
import showdown from 'showdown'
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';
import { articleTopicParams } from '@/utils/type';

type InitProps = {
  data: any;
  loading: boolean;
  type: string;
  refreshArticleData: () => void
  getArticleDataByTopic: (params: articleTopicParams) => void
};

const HomeContent: FC<InitProps> = ({ data, loading, type, refreshArticleData, getArticleDataByTopic }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedTags, handleSelectedTags] = useState<string[]>([]);

  const [trendingList, handleTrendingList] = useState<Array<string>>([])
  const [chooseTag, handleChooseTag] = useState<string>('')

  useEffect(() => {
    handleTrendingList(['BTC', 'NFT', 'Web3', 'Ethereum', 'ETH', 'Gamefi', 'Defi', 'Crypto', 'Blockchain', 'Music', 'Airdrop', 'Investment', 'Layer2', 'SocialFi', 'IDO', 'IEO', 'DEX', 'Trade', 'Exchange', 'SOL'])
  }, [])

  const tagBtnClick = (tag: string) => {
    handleChooseTag(tag)
    let params = {
      topic: tag,
      lan: localStorage.getItem('lan') || 'en',
    }
    getArticleDataByTopic(params)
  }

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
    <div className='homeContentContainer' ref={scrollRef}>
      <Spin spinning={loading}>
        {type === 'home' ? <div className='trendingContainer'>
          <div className='trendingLeft'>Topics:</div>
          <div className='trendingRight'>
            {trendingList.map(tag => (
              <div className={`tagBtn ${chooseTag === tag ? 'chooseTagBtn' : ''}`} onClick={() => tagBtnClick(tag)}>{tag}</div>
            ))}
          </div>
        </div> : null}
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