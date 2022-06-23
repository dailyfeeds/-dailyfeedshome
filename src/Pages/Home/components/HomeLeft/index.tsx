import { FC } from 'react';
import { Button } from 'antd';
import renwuImg from '@/assets/images/renwu.svg'
import './index.less';


type InitProps = {
  changeData: (value: any) => void;
};

const HomeLeft: FC<InitProps> = ({ changeData }) => {

  return (
    <div className='homeLeftContainer'>
      <h3>Home</h3>
      <h3>Earn</h3>
      <h3>MarketPlace</h3>
      <h3>Stake</h3>

      <Button type='primary' className='createBtn'>Create</Button>
      <div className='bottomSty'>
        <img src={renwuImg} alt="" />
      </div>
    </div>
  )
};

export default HomeLeft