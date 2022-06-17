import { FC, useState, useEffect } from 'react';
import HomeTop from "./components/HomeTop";
import HomeLeft from "./components/HomeLeft";
import HomeRight from "./components/HomeRight";
import { getArticle } from "@/utils/api";
import './index.less';
import { axiosResult } from '@/utils/type';

const Home: FC = () => {
  const [data, handleData] = useState<any>([])
  const [loading, handleLoading] = useState<boolean>(false)

  useEffect(() => {
    getArticleData()
  }, [])

  const getArticleData = () => {
    handleLoading(true)
    let params = {
      "num": 5,
      "id_before": 0
    }
    getArticle(params).then((res: axiosResult) => {
      handleLoading(false)
      if (res.code === 0) {
        handleData(res.result)
      }
    })
  }

  const changeData = (data: any) => {
    handleData(data)
  }

  return (
    <>
      <HomeTop changeData={changeData} />
      <div className='buySellContainer'>
        {/* <HomeLeft changeData={changeData} /> */}
        <HomeRight data={data} loading={loading} />
      </div>
    </>
  )
};

export default Home