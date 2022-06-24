import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HomeTop from "../components/HomeTop";
import HomeRight from "./components/UserHomeRight";
import { getUserArticle } from "@/utils/api";
import './index.less';
import { axiosResult } from '@/utils/type';

const UserHome: FC = () => {
  const routerParams = useParams();
  const navigate = useNavigate();

  const [data, handleData] = useState<any>({})
  const [loading, handleLoading] = useState<boolean>(false)

  useEffect(() => {
    getUserArticleData()
  }, [])

  const getUserArticleData = () => {
    handleLoading(true)
    let address = routerParams['address'] || '';
    let params = {
      address
    }
    getUserArticle(params).then((res: axiosResult) => {
      handleLoading(false)
      if (res.code === 0) {
        handleData(res.result)
      }
    })
  }

  return (
    <>
      <HomeTop />
      <div className='userHome'>
        <h2>{loading ? '' : `Posts From ${data.displayName}`}</h2>
        <HomeRight data={data} loading={loading} />
      </div>
    </>
  )
};

export default UserHome