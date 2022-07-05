import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom';
import { Button, Popover } from 'antd';
import { useStores } from "@/store";
import defaultAvatarImg from '@/assets/images/defaultAvatar.svg'
import loginAvatarImg from '@/assets/images/loginAvatar.svg'
import './index.less';


type InitProps = {
  changeData: (value: any) => void;
};

const HomeLeft: FC<InitProps> = ({ changeData }) => {
  const navigate = useNavigate();
  const {
    HomeStore: { changeWalletAddress, walletAddress },
  } = useStores()

  const [address, handleAddress] = useState('')

  useEffect(() => {
    if (walletAddress) {
      handleAddress(walletAddress)
    } else if (localStorage.getItem('walletAddress')) {
      handleAddress(localStorage.getItem('walletAddress') || '')
    }
  }, [walletAddress])

  const clearWalletAddress = () => {
    changeWalletAddress('');
    handleAddress('');
    localStorage.clear();

  }
  const content = () => {
    return (
      <div className='personContent'>
        <div className='settingContainer' onClick={clearWalletAddress}>Sign out</div>
        <div className='settingContainer' onClick={() => navigate('/setting')}>Setting</div>
        <div className='personDetails'>
          <div className='leftDetails'>
            <img src={loginAvatarImg} alt="avatar" />
          </div>
          <div className='rightDetails'>
            {`${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='homeLeftContainer'>
      <h3>Home</h3>
      <h3>Earn</h3>
      <h3>MarketPlace</h3>
      <h3>Stake</h3>

      <Button type='primary' className='createBtn'>Create</Button>
      <div className='bottomSty'>
        {
          address ? <Popover content={content} title={false}><img src={loginAvatarImg} alt="avatar" /></Popover> : <img src={defaultAvatarImg} alt="avatar" />
        }
      </div>
    </div>
  )
};

export default observer(HomeLeft)