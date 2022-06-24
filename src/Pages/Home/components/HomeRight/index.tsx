import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { getRecommendedAuthorData } from "@/utils/api";
import { axiosResult, recommendedAuthorParams } from '@/utils/type';
import refreshImg from "@/assets/images/refresh.svg";

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

  useEffect(() => {
    let params = {
      num: 10,
      after_ts: '',
      after_id: '',
    }
    getRecommendedAuthor(params)
  }, [])

  const getRecommendedAuthor = (params: recommendedAuthorParams) => {
    getRecommendedAuthorData(params).then((res: axiosResult) => {
      if (res.code === 0) {
        HandleRecommendedAuthor(res.result)
      }
    })
  }

  return (
    <div className='homeRightContainer'>
      <div className='connectBtnContainer'><Button type='primary' className='connectBtn'>Connect Wallet</Button></div>
      <div className='homeRightTop'>
        <div className='homeRightTopTitle'>Recommended</div>
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
    </div>
  )
};

export default HomeRight