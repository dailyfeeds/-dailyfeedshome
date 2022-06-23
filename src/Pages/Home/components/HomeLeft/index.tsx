import { FC } from 'react';
import './index.less';


type InitProps = {
  changeData: (value: any) => void;
};

const HomeLeft: FC<InitProps> = ({ changeData }) => {

  return (
    <div className='homeLeftContainer'>
      <div className='title'>DailyFeeds</div>
    </div>
  )
};

export default HomeLeft