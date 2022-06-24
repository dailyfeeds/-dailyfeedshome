import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { getRecommendedAuthorData } from "@/utils/api";
import { axiosResult, recommendedAuthorParams } from '@/utils/type';
import refreshImg from "@/assets/images/refresh.svg";
import mmbotImg from "@/assets/images/mmbot.svg";
import facebookImg from "@/assets/images/facebook.svg";
import githubImg from "@/assets/images/github.svg";

import './index.less';

interface recommendedProp {
  address: string;
  authorId: string;
  avatarURL: string;
  description: string;
  displayName: string;
  domain: string;
  ens: string;
  latestPublishTime: number | string
}

const HomeRight: FC = () => {
  const navigate = useNavigate();

  const [recommendedAuthor, HandleRecommendedAuthor] = useState<Array<recommendedProp>>([])
  const [loading, handleLoading] = useState<boolean>(false)

  useEffect(() => {
    let params = {
      num: 10,
      after_ts: '',
      after_id: '',
    }
    getRecommendedAuthor(params)
  }, [])

  const getRecommendedAuthor = (params: recommendedAuthorParams) => {
    handleLoading(true)
    getRecommendedAuthorData(params).then((res: axiosResult) => {
      handleLoading(false)
      if (res.code === 0) {
        HandleRecommendedAuthor(res.result)
      }
    })
  }

  return (
    <div className='homeRightContainer'>
      <Spin spinning={loading}>
        <div className='homeRightTop'>
          <div className='homeRightTopTitle'>Who to follow</div>
          <img onClick={() => {
            getRecommendedAuthor({
              num: 10,
              after_ts: '',
              after_id: '',
            })
          }} className='homeRightTopImg' src={refreshImg} alt="refresh" />
        </div>
        {recommendedAuthor.map((item, index) => {
          return (
            <div key={item.address} className={`recommendedAuthorContainer ${recommendedAuthor.length === index + 1 ? 'lasterRecommendedAuthorContainer' : ""}`}>
              <div className='containerLeft' onClick={() => { navigate(`/author/${item.address}`) }}>
                <img src={item.avatarURL} alt="avatar" />
                <span>{item.displayName}</span>
              </div>
              <div className='containerRight'>Follow</div>
            </div>
          )
        })}
      </Spin>
      <div className='bottomSty'>
        <div className='follow'>Follow us</div>
        <div className='followChat'>
          <img className='chatImg' src={mmbotImg} alt="" />
          <img className='chatImg' src={facebookImg} alt="" />
          <img className='chatImg' src={githubImg} alt="" />
        </div>
      </div>
    </div>
  )
};

export default HomeRight