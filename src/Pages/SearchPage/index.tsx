import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HomeTop from "../components/HomeTop";
import { Comment, Avatar, Spin, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { searchArticle } from "@/utils/api";
import './index.less';
import { axiosResult } from '@/utils/type';

const Home: FC = () => {
  const routerParams = useParams();
  const navigate = useNavigate();

  const [data, handleData] = useState<any>([])
  const [loading, handleLoading] = useState<boolean>(false)

  useEffect(() => {
    let searchWord = routerParams['searchWord'] || '';
    let params = {
      'words': searchWord
    }
    searchArticle(params).then((res: axiosResult) => {
      if (res.code === 0) {
        handleData(res.result)
      }
    })
  }, [])

  const contentContainer = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} className='contentHtml' />
  }

  const viewDetails = (id: string) => {
    navigate(`/details/${id}`)
  }

  return (
    <>
      <HomeTop />
      <div className='searchPageContainer'>
        <Spin spinning={loading}>
          {
            data.map((item: any) => {
              return (
                <div key={item.originalDigest} onClick={() => viewDetails(item.contentDigest)}>
                  <Comment
                    author={<span className='authorSty'>{item.title}</span>}
                    avatar={<div onClick={() => { navigate(`/author/${item.address}`) }}>{item.avatarURL ? <Avatar src={item.avatarURL} alt="avatar" /> : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}</div>}
                    content={contentContainer(item.snipped)}
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
    </>
  )
};

export default Home