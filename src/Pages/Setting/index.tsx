import { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react'
import { Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useStores } from "@/store";
import { authorizeTwitter } from "@/utils/api";
import HomeTop from "../components/HomeTop";
import { authorizeTwitterCallback, getTwitterConnectStatus } from "@/utils/api";
import './index.less';
import { axiosResult } from '@/utils/type';

const Setting: FC = () => {
  const routerParams = useParams();
  const { HomeStore: { walletAddress } } = useStores()

  const [twitterBtnText, handleTwitterBtnText] = useState('Connect to Twitter')
  const [twitterBtnLogo, handleTwitterBtnLogo] = useState('')

  useEffect(() => {
    let state = routerParams['state'] || '';
    let code = routerParams['code'] || '';
    if (state && code) {
      let params = { state, code, }
      authorizeTwitterCallback(params).then((res: axiosResult) => {
        if (res.code === 0) {
          handleTwitterBtnText(res.result.name)
          handleTwitterBtnLogo(res.result.profile_image_url)
        }
      })
    }
  }, []);

  useEffect(() => {
    if (walletAddress || localStorage.getItem('walletAddress')) {
      let address = walletAddress || localStorage.getItem('walletAddress') || ''
      getTwitterConnectStatus(address).then((res: axiosResult) => {
        if (res.code === 0) {
          handleTwitterBtnText(res.result.name)
          handleTwitterBtnLogo(res.result.profile_image_url)
        }
      })
    }
  }, [walletAddress, localStorage.getItem('walletAddress')]);

  const connectTwitter = () => {
    if (!walletAddress && !localStorage.getItem('walletAddress')) {
      message.error('Please Connect Your Wallet')
    } else {
      let address = walletAddress || localStorage.getItem('walletAddress') || ''
      authorizeTwitter(address).then((res: axiosResult) => {
        if (res.code === 0) {
          window.open(res.result, '_self')
        } else {
          message.error(res.msg)
        }
      })
    }
  }

  return (
    <>
      <HomeTop />
      <div className='settingContainer'>
        <div className='navLeft'>
          <h3>Setting</h3>
          <div className='tag'>Connections</div>
        </div>
        <div className='containerRight'>
          <div className='listContainer'>
            <div className='title'>Connections</div>
            <div className='container'>
              <div className='listLeft'>
                <div className='tag'>Connect to Twitter</div>
                <div className='tips'>We will never post to Twitter or message your followers without your permission.</div>
              </div>
              <div className='listRight'>
                {twitterBtnLogo ?
                  <div className='twitterContainer'><span className='twitterName'>@{twitterBtnText}</span><img className='twitterLogo' src={twitterBtnLogo} /></div>
                  : <Button type='primary' className='connectBtn' onClick={connectTwitter}>{twitterBtnText}</Button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default observer(Setting)